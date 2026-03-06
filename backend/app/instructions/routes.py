from fastapi import APIRouter, File, UploadFile

from ..config import get_settings
from .models import INSTRUCTION_TEMPLATES
from .service import (
    build_instruction_record,
    recognize_business_type,
    save_uploaded_file,
    uploaded_instructions,
)


router = APIRouter(prefix="/api/instructions", tags=["instructions"])


@router.get("/templates")
def get_templates():
    return {"templates": INSTRUCTION_TEMPLATES}


@router.get("/list")
def list_instructions():
    return {"instructions": uploaded_instructions}


@router.post("/upload")
async def upload_instruction(file: UploadFile = File(...)):
    settings = get_settings()

    file_id = save_uploaded_file(file, settings.upload_dir)
    biz_type = recognize_business_type(file.filename)
    instruction = build_instruction_record(file_id=file_id, filename=file.filename, biz_type=biz_type)

    uploaded_instructions.append(instruction)
    return {"success": True, "instruction": instruction}

