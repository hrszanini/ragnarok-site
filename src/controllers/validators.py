from hashlib import md5


def validate_password(password: str):
    if len(password) <= 4 or ';' in password:
        raise ValueError
    return md5(password.encode()).hexdigest()


__all__ = ["validate_password"]
