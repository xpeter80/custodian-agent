import os
import shutil
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse

from .mock_data import (
    CONTRACT_TEXT_ZH, CONTRACT_TEXT_EN, EXTRACTED_RULES,
    INDICATORS, CONTRACT_META, EXTRACTION_STAGES
)

router = APIRouter(prefix="/api/supervision", tags=["supervision"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads", "contracts")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    """Upload a contract PDF and return metadata."""
    filepath = os.path.join(UPLOAD_DIR, file.filename)
    with open(filepath, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return {
        "success": True,
        "contract": {
            "id": "CTR-001",
            "filename": file.filename,
            "meta": CONTRACT_META,
            "contractText": {
                "zh": CONTRACT_TEXT_ZH,
                "en": CONTRACT_TEXT_EN,
            },
            "extractionStages": EXTRACTION_STAGES,
        }
    }


@router.post("/extract")
async def extract_rules(contract_id: str = "CTR-001"):
    """Simulate AI rule extraction from the contract."""
    return {
        "success": True,
        "contractId": contract_id,
        "extractedRules": EXTRACTED_RULES,
        "indicators": INDICATORS,
        "stats": {
            "totalRules": len(EXTRACTED_RULES),
            "autoExtracted": len(EXTRACTED_RULES) - 2,
            "manualReview": 2,
        }
    }


@router.get("/contracts")
async def list_contracts():
    """List uploaded contracts."""
    return {
        "contracts": [
            {
                "id": "CTR-001",
                "filename": "太平资产乾坤9号资管产品托管合同20160301.pdf",
                "meta": CONTRACT_META,
            }
        ]
    }
