from datetime import datetime, timedelta, timezone
from typing import Dict, List, Literal, TypedDict

from fastapi import APIRouter


AlertLevel = Literal["none", "warning", "critical"]


class ManualInstruction(TypedDict):
    id: str
    fundName: str
    businessType: str
    status: str
    statusUpdatedAt: str
    amount: float


class ManualInstructionWithAlert(ManualInstruction):
    stuckMinutes: int
    alertLevel: AlertLevel


class FundSummary(TypedDict):
    fundName: str
    instructionCount: int
    warningCount: int
    criticalCount: int
    maxStuckMinutes: int
    avgStuckMinutes: float
    totalAmount: float


THRESHOLD_WARNING_MINUTES = 20
THRESHOLD_CRITICAL_MINUTES = 60

MANUAL_STATES = {"MANUAL_REVIEW", "PENDING_PAY"}

router = APIRouter(prefix="/api/monitor/manual-stuck", tags=["manual_stuck_monitor"])


def _build_mock_instructions(now: datetime) -> List[ManualInstruction]:
    return [
        {
            "id": "INS-202503010001",
            "fundName": "博时策略混合",
            "businessType": "ipo_subscription",
            "status": "MANUAL_REVIEW",
            "statusUpdatedAt": (now - timedelta(minutes=10)).isoformat(),
            "amount": 50_000_000.00,
        },
        {
            "id": "INS-202503010002",
            "fundName": "汇丰晋信动态策略混合",
            "businessType": "custody_fee",
            "status": "PENDING_PAY",
            "statusUpdatedAt": (now - timedelta(minutes=35)).isoformat(),
            "amount": 350_000.00,
        },
        {
            "id": "INS-202503010003",
            "fundName": "华夏回报混合A",
            "businessType": "dividend",
            "status": "PENDING_PAY",
            "statusUpdatedAt": (now - timedelta(minutes=95)).isoformat(),
            "amount": 18_500_000.00,
        },
        {
            "id": "INS-202503010004",
            "fundName": "博时策略混合",
            "businessType": "ipo_subscription",
            "status": "PENDING_PAY",
            "statusUpdatedAt": (now - timedelta(minutes=55)).isoformat(),
            "amount": 30_000_000.00,
        },
        {
            "id": "INS-202503010005",
            "fundName": "博时价值增长",
            "businessType": "redemption",
            "status": "MANUAL_REVIEW",
            "statusUpdatedAt": (now - timedelta(minutes=70)).isoformat(),
            "amount": 52_800_000.00,
        },
        {
            "id": "INS-202503010006",
            "fundName": "汇丰晋信动态策略混合",
            "businessType": "custody_fee",
            "status": "MANUAL_REVIEW",
            "statusUpdatedAt": (now - timedelta(minutes=25)).isoformat(),
            "amount": 480_000.00,
        },
    ]


def _evaluate_alert(now: datetime, item: ManualInstruction) -> ManualInstructionWithAlert:
    updated_at = datetime.fromisoformat(item["statusUpdatedAt"])
    if updated_at.tzinfo is None:
        updated_at = updated_at.replace(tzinfo=timezone.utc)

    stuck_minutes = int((now - updated_at).total_seconds() // 60)

    if item["status"] not in MANUAL_STATES:
        level: AlertLevel = "none"
    elif stuck_minutes >= THRESHOLD_CRITICAL_MINUTES:
        level = "critical"
    elif stuck_minutes >= THRESHOLD_WARNING_MINUTES:
        level = "warning"
    else:
        level = "none"

    return {
        **item,
        "stuckMinutes": stuck_minutes,
        "alertLevel": level,
    }


def _build_fund_summary(items: List[ManualInstructionWithAlert]) -> List[FundSummary]:
    per_fund: Dict[str, FundSummary] = {}
    for item in items:
        if item["alertLevel"] == "none":
            continue

        fund = item["fundName"]
        current = per_fund.get(
            fund,
            {
                "fundName": fund,
                "instructionCount": 0,
                "warningCount": 0,
                "criticalCount": 0,
                "maxStuckMinutes": 0,
                "avgStuckMinutes": 0.0,
                "totalAmount": 0.0,
            },
        )

        current["instructionCount"] += 1
        if item["alertLevel"] == "warning":
            current["warningCount"] += 1
        elif item["alertLevel"] == "critical":
            current["criticalCount"] += 1

        current["totalAmount"] += float(item["amount"])
        current["maxStuckMinutes"] = max(current["maxStuckMinutes"], int(item["stuckMinutes"]))

        per_fund[fund] = current

    # compute avg stuck minutes
    for fund, summary in per_fund.items():
        if summary["instructionCount"] > 0:
            total_stuck = sum(
                i["stuckMinutes"]
                for i in items
                if i["fundName"] == fund and i["alertLevel"] != "none"
            )
            summary["avgStuckMinutes"] = round(
                total_stuck / summary["instructionCount"], 1
            )

    return sorted(
        per_fund.values(),
        key=lambda x: (x["criticalCount"], x["warningCount"], x["maxStuckMinutes"]),
        reverse=True,
    )


@router.get("/list")
def list_manual_stuck() -> Dict[str, object]:
    now = datetime.now(timezone.utc)
    base_items = _build_mock_instructions(now)
    items: List[ManualInstructionWithAlert] = [
        _evaluate_alert(now, item) for item in base_items
    ]

    warning_count = sum(1 for i in items if i["alertLevel"] == "warning")
    critical_count = sum(1 for i in items if i["alertLevel"] == "critical")

    summary = {
        "warningCount": warning_count,
        "criticalCount": critical_count,
        "totalManualStuck": warning_count + critical_count,
    }

    return {
        "summary": summary,
        "fundSummary": _build_fund_summary(items),
        "items": items,
    }

