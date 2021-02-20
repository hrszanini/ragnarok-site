import model
import services


def check_user(user_id: str):
    clause = f'user_id={user_id}'
    response = services.mysql.select(table=services.LOGIN_TABLE, where_clause=clause)

    not_exist = True
    for _ in response:
        not_exist = False
    return not_exist


def insert_user(user_id, user_password, user_email, user_birthday):
    pass


def update_password(user_id, user_password):
    pass


