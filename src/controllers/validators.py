def validate_password(password: str):
    if len(password) <= 4 or ';' in password:
        raise ValueError
    return password


__all__ = ["validate_password"]
