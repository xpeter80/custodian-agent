import os
from dataclasses import dataclass
from pathlib import Path


@dataclass
class Settings:
    api_key: str
    upload_dir: Path


def get_settings() -> Settings:
    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)
    api_key = os.environ.get("API_KEY", "")
    return Settings(api_key=api_key, upload_dir=upload_dir)

