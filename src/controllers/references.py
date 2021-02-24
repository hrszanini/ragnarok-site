import pydantic
import typing
import controllers


class NewUser(pydantic.BaseModel):
    user_id: str
    user_password: str
    user_email: str
    user_birthday: str
    _user_password = pydantic.validator('user_password', allow_reuse=True)(controllers.validate_password)


class Login(pydantic.BaseModel):
    user_id: typing.Optional[str]
    user_password: typing.Optional[str]
    new_password: typing.Optional[str]
    _new_password = pydantic.validator('new_password', allow_reuse=True)(controllers.validate_password)
    token: typing.Optional[str]
