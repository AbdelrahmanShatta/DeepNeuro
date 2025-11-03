import os

PROJECT_NAME = "{{cookiecutter.project_name}}"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

API_V1_STR = "/api/v1"

# Comma-separated list of origins, e.g. "http://localhost:19006,http://127.0.0.1:19006"
_origins = os.getenv("CORS_ALLOWED_ORIGINS", "")
CORS_ALLOWED_ORIGINS = [o.strip() for o in _origins.split(",") if o.strip()] if _origins else []
