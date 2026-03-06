from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import uuid
import shutil
from pathlib import Path

app = FastAPI(title="Asset Custody Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.environ.get("API_KEY", "")

# In-memory store for uploaded instructions
uploaded_instructions = []

# ================== Instruction Templates ==================

INSTRUCTION_TEMPLATES = {
    "ipo_subscription": {
        "name": {"zh": "网下IPO申购划款", "en": "Offline IPO Subscription Payment"},
        "fields": [
            {"key": "fundName", "label": {"zh": "基金名称", "en": "Fund Name"}, "type": "text"},
            {"key": "instructionNo", "label": {"zh": "指令编号", "en": "Instruction No."}, "type": "text"},
            {"key": "subscriptionPrice", "label": {"zh": "申购价格", "en": "Subscription Price"}, "type": "currency"},
            {"key": "subscriptionQty", "label": {"zh": "申购数量", "en": "Subscription Qty"}, "type": "number"},
            {"key": "amount", "label": {"zh": "划款金额", "en": "Transfer Amount"}, "type": "currency"},
            {"key": "amountCN", "label": {"zh": "大写金额", "en": "Amount (Words)"}, "type": "text"},
            {"key": "payee", "label": {"zh": "收款单位", "en": "Payee"}, "type": "text"},
            {"key": "payeeBank", "label": {"zh": "开户银行", "en": "Payee Bank"}, "type": "text"},
            {"key": "account", "label": {"zh": "账号", "en": "Account No."}, "type": "text"},
            {"key": "purpose", "label": {"zh": "划款用途", "en": "Transfer Purpose"}, "type": "text"},
            {"key": "deadline", "label": {"zh": "最迟到账时间", "en": "Latest Arrival Time"}, "type": "date"},
        ]
    },
    "custody_fee": {
        "name": {"zh": "托管费划款", "en": "Custody Fee Payment"},
        "fields": [
            {"key": "fundName", "label": {"zh": "基金名称", "en": "Fund Name"}, "type": "text"},
            {"key": "instructionNo", "label": {"zh": "指令编号", "en": "Instruction No."}, "type": "text"},
            {"key": "amount", "label": {"zh": "划款金额", "en": "Transfer Amount"}, "type": "currency"},
            {"key": "amountCN", "label": {"zh": "大写金额", "en": "Amount (Words)"}, "type": "text"},
            {"key": "feeType", "label": {"zh": "费用类型", "en": "Fee Type"}, "type": "text"},
            {"key": "feePeriod", "label": {"zh": "计费期间", "en": "Billing Period"}, "type": "text"},
            {"key": "payee", "label": {"zh": "收款单位", "en": "Payee"}, "type": "text"},
            {"key": "payeeBank", "label": {"zh": "开户银行", "en": "Payee Bank"}, "type": "text"},
            {"key": "account", "label": {"zh": "账号", "en": "Account No."}, "type": "text"},
            {"key": "deadline", "label": {"zh": "最迟到账时间", "en": "Latest Arrival Time"}, "type": "date"},
        ]
    },
    "interbank_settlement": {
        "name": {"zh": "银行间成交单", "en": "Interbank Settlement"},
        "fields": [
            {"key": "direction", "label": {"zh": "交易方向", "en": "Trade Direction"}, "type": "text"},
            {"key": "product", "label": {"zh": "交易品种", "en": "Product"}, "type": "text"},
            {"key": "amount", "label": {"zh": "成交金额", "en": "Settlement Amount"}, "type": "currency"},
            {"key": "price", "label": {"zh": "成交价格", "en": "Settlement Price"}, "type": "currency"},
            {"key": "quantity", "label": {"zh": "成交数量", "en": "Quantity"}, "type": "number"},
            {"key": "settlementDate", "label": {"zh": "结算日期", "en": "Settlement Date"}, "type": "date"},
            {"key": "counterparty", "label": {"zh": "对手方", "en": "Counterparty"}, "type": "text"},
            {"key": "deliveryMethod", "label": {"zh": "交割方式", "en": "Delivery Method"}, "type": "text"},
        ]
    },
    "redemption": {
        "name": {"zh": "赎回划款", "en": "Redemption Payment"},
        "fields": [
            {"key": "fundName", "label": {"zh": "基金名称", "en": "Fund Name"}, "type": "text"},
            {"key": "instructionNo", "label": {"zh": "指令编号", "en": "Instruction No."}, "type": "text"},
            {"key": "amount", "label": {"zh": "划款金额", "en": "Transfer Amount"}, "type": "currency"},
            {"key": "amountCN", "label": {"zh": "大写金额", "en": "Amount (Words)"}, "type": "text"},
            {"key": "payee", "label": {"zh": "收款单位", "en": "Payee"}, "type": "text"},
            {"key": "payeeBank", "label": {"zh": "开户银行", "en": "Payee Bank"}, "type": "text"},
            {"key": "account", "label": {"zh": "账号", "en": "Account No."}, "type": "text"},
            {"key": "purpose", "label": {"zh": "划款用途", "en": "Transfer Purpose"}, "type": "text"},
            {"key": "deadline", "label": {"zh": "最迟到账时间", "en": "Latest Arrival Time"}, "type": "date"},
        ]
    },
    "dividend": {
        "name": {"zh": "分红划款", "en": "Dividend Payment"},
        "fields": [
            {"key": "fundName", "label": {"zh": "基金名称", "en": "Fund Name"}, "type": "text"},
            {"key": "instructionNo", "label": {"zh": "指令编号", "en": "Instruction No."}, "type": "text"},
            {"key": "amount", "label": {"zh": "分红金额", "en": "Dividend Amount"}, "type": "currency"},
            {"key": "amountCN", "label": {"zh": "大写金额", "en": "Amount (Words)"}, "type": "text"},
            {"key": "dividendDate", "label": {"zh": "分红日期", "en": "Dividend Date"}, "type": "date"},
            {"key": "payee", "label": {"zh": "收款单位", "en": "Payee"}, "type": "text"},
            {"key": "account", "label": {"zh": "账号", "en": "Account No."}, "type": "text"},
            {"key": "deadline", "label": {"zh": "最迟到账时间", "en": "Latest Arrival Time"}, "type": "date"},
        ]
    },
}

# Mock recognition data keyed by business type
MOCK_RECOGNITION_DATA = {
    "ipo_subscription": {
        "fundName": {"zh": "博时策略混合", "en": "Bosera Strategy Mixed"},
        "instructionNo": "2011年88号",
        "subscriptionPrice": "28.00",
        "subscriptionQty": "5,000,000",
        "amount": "140,000,000.00",
        "amountCN": {"zh": "壹亿肆仟万元整", "en": "One Hundred Forty Million Yuan"},
        "payee": {"zh": "中国证券登记结算有限责任公司上海分公司（网下发行专户）", "en": "CSDC Shanghai Branch (Offline IPO Account)"},
        "payeeBank": {"zh": "中国建设银行股份有限公司上海市分行营业部", "en": "CCB Shanghai Branch Business Dept"},
        "account": "31001550400050015290",
        "purpose": "D890775821601336",
        "deadline": "2011-12-07",
    },
    "custody_fee": {
        "fundName": {"zh": "汇丰晋信动态策略混合", "en": "HSBC Jintrust Dynamic Strategy Mixed"},
        "instructionNo": "2024年045号",
        "amount": "356,800.00",
        "amountCN": {"zh": "叁拾伍万陆仟捌佰元整", "en": "Three Hundred Fifty-Six Thousand Eight Hundred Yuan"},
        "feeType": {"zh": "托管费", "en": "Custody Fee"},
        "feePeriod": "2024-01 ~ 2024-03",
        "payee": {"zh": "汇丰晋信基金管理有限公司", "en": "HSBC Jintrust Fund Management Co."},
        "payeeBank": {"zh": "汇丰银行（中国）有限公司上海分行", "en": "HSBC Bank (China) Shanghai Branch"},
        "account": "621088010000287956",
        "deadline": "2024-03-31",
    },
    "interbank_settlement": {
        "direction": {"zh": "买入", "en": "Buy"},
        "product": {"zh": "24国开05", "en": "24 CDB 05"},
        "amount": "50,230,000.00",
        "price": "100.46",
        "quantity": "500,000",
        "settlementDate": "2024-03-15",
        "counterparty": {"zh": "中国工商银行股份有限公司", "en": "ICBC Co., Ltd."},
        "deliveryMethod": {"zh": "券款对付(DVP)", "en": "Delivery vs Payment (DVP)"},
    },
    "redemption": {
        "fundName": {"zh": "博时价值增长", "en": "Bosera Value Growth"},
        "instructionNo": "2024年156号",
        "amount": "52,800,000.00",
        "amountCN": {"zh": "伍仟贰佰捌拾万元整", "en": "Fifty-two Million Eight Hundred Thousand Yuan"},
        "payee": {"zh": "博时基金管理有限公司", "en": "Bosera Fund Management Co., Ltd"},
        "payeeBank": {"zh": "招商银行股份有限公司深圳分行", "en": "China Merchants Bank Shenzhen Branch"},
        "account": "755936020910001",
        "purpose": "R20240315001",
        "deadline": "2024-03-16",
    },
    "dividend": {
        "fundName": {"zh": "华夏回报混合A", "en": "ChinaAMC Return Mixed A"},
        "instructionNo": "2024年203号",
        "amount": "18,500,000.00",
        "amountCN": {"zh": "壹仟捌佰伍拾万元整", "en": "Eighteen Million Five Hundred Thousand Yuan"},
        "dividendDate": "2024-03-15",
        "payee": {"zh": "中国银行股份有限公司托管专户", "en": "Bank of China Custody Account"},
        "account": "341256789012345",
        "deadline": "2024-03-17",
    },
}

# Recognition keywords mapping
RECOGNITION_KEYWORDS = {
    "ipo_subscription": ["IPO", "ipo", "申购", "网下", "发行"],
    "custody_fee": ["托管费", "管理费", "custody fee", "management fee"],
    "interbank_settlement": ["成交单", "银行间", "interbank", "settlement"],
    "redemption": ["赎回", "redemption"],
    "dividend": ["分红", "dividend", "红利"],
}


def recognize_business_type(filename: str) -> str:
    """Recognize business type from filename keywords."""
    for biz_type, keywords in RECOGNITION_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in filename.lower():
                return biz_type
    return "ipo_subscription"  # Default fallback


# ================== API Endpoints ==================

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Backend API is running"}


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/instructions/templates")
def get_templates():
    """Return all instruction templates."""
    return {"templates": INSTRUCTION_TEMPLATES}


@app.get("/api/instructions/list")
def list_instructions():
    """Return all uploaded instructions."""
    return {"instructions": uploaded_instructions}


@app.post("/api/instructions/upload")
async def upload_instruction(file: UploadFile = File(...)):
    """Upload and recognize an instruction file."""
    # Save file
    file_id = str(uuid.uuid4())[:8]
    ext = Path(file.filename).suffix
    save_path = UPLOAD_DIR / f"{file_id}{ext}"
    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Recognize business type from filename
    biz_type = recognize_business_type(file.filename)

    # Get mock data for this business type
    mock_data = MOCK_RECOGNITION_DATA.get(biz_type, {})
    template = INSTRUCTION_TEMPLATES.get(biz_type, {})

    # Build instruction record
    import random
    instruction = {
        "id": f"INS-{file_id.upper()}",
        "filename": file.filename,
        "businessType": biz_type,
        "businessTypeName": template.get("name", {}),
        "confidence": round(random.uniform(91.0, 99.5), 1),
        "status": "completed",
        "recognizedFields": mock_data,
        "templateFields": template.get("fields", []),
    }

    uploaded_instructions.append(instruction)

    return {"success": True, "instruction": instruction}


@app.post("/api/chat")
async def proxy_to_llm(request: Request):
    """Proxy LLM calls — frontend must not call LLM directly."""
    payload = await request.json()
    if not API_KEY:
        return {"error": "API_KEY not configured on backend."}
    return {
        "reply": f"Mock LLM response for: {payload.get('message', '')} (Secured via Backend)"
    }
