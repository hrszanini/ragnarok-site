from threading import Thread

from .configuration import *
from . import mysql, token, exceptions

from .login import (
    check_user,
    insert_user,
    update_password,
    get_user,
    login
)

tokens = []

Thread(target=token.limit_tokens_time, args=(300, tokens,)).start()
