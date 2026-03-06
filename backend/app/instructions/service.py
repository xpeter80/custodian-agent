import random
import shutil
import uuid
from pathlib import Path
from typing import Dict, List

from fastapi import UploadFile

from .models import INSTRUCTION_TEMPLATES, MOCK_RECOGNITION_DATA, RECOGNITION_KEYWORDS


uploaded_instructions: List[Dict] = []


def recognize_business_type(filename: str) -> str:
    for biz_type, keywords in RECOGNITION_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in filename.lower():
                return biz_type
    return "ipo_subscription"


def save_uploaded_file(file: UploadFile, upload_dir: Path) -> str:
    file_id = str(uuid.uuid4())[:8]
    ext = Path(file.filename).suffix
    save_path = upload_dir / f"{file_id}{ext}"
    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return file_id


def build_instruction_record(file_id: str, filename: str, biz_type: str) -> Dict:
    mock_data = MOCK_RECOGNITION_DATA.get(biz_type, {})
    template = INSTRUCTION_TEMPLATES.get(biz_type, {})

    instruction = {
        "id": f"INS-{file_id.upper()}",
        "filename": filename,
        "businessType": biz_type,
        "businessTypeName": template.get("name", {}),
        "confidence": round(random.uniform(91.0, 99.5), 1),
        "status": "completed",
        "recognizedFields": mock_data,
        "templateFields": template.get("fields", []),
    }
    return instruction

