from pydantic import BaseModel


class SettingCreate(BaseModel):

    key: str

    value: str
