from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, Setting
from schemas import SettingCreate


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="JellyReport API",
    version="0.1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@app.get("/api/health")
def health():

    return {
        "status": "healthy"
    }

@app.get("/api/status")
def status(
    db: Session = Depends(get_db)
):

    jellyfin_url = (
        db.query(Setting)
        .filter(
            Setting.key == "jellyfin_url"
        )
        .first()
    )


    jellyfin_key = (
        db.query(Setting)
        .filter(
            Setting.key == "jellyfin_api_key"
        )
        .first()
    )


    return {
        "setup_complete":
            jellyfin_url is not None
            and jellyfin_key is not None
    }


@app.get("/api/settings")
def get_settings(
    db: Session = Depends(get_db)
):

    settings = db.query(Setting).all()

    return settings



@app.post("/api/settings")
def create_setting(
    setting: SettingCreate,
    db: Session = Depends(get_db)
):

    new_setting = Setting(
        key=setting.key,
        value=setting.value
    )

    db.add(new_setting)

    db.commit()

    db.refresh(new_setting)

    return new_setting
