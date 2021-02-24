import time
import uuid
from datetime import datetime


class Token:
    token = None
    time = None

    def __init__(self, user):
        self.user = user

    def get(self):
        self.time = datetime.now()
        self.token = uuid.uuid4().hex
        return self.token

    def verify(self, token):
        return token == self.token


def limit_tokens_time(limit_in_seconds: int, tokens_list: list):
    while True:
        tokens_to_remove = []
        for token in tokens_list:
            if(token.time - datetime.now()).total_seconds() > limit_in_seconds:
                tokens_to_remove.append(token)
        for token in tokens_to_remove:
            tokens_list.remove(token)
        time.sleep(10)


def get_token(tokens_list: list, token_to_check):
    for token in tokens_list:
        if token.verify(token_to_check):
            return token
    return None
