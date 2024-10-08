from loguru import logger

import model
import services


def login(user_id: str, user_password: str):
    try:
        user = get_user(user_id)
        if user.user_pass != user_password:
            raise RuntimeError('Usuário não possui permissão para alteração!')
        new_token = services.token.Token(user)
        services.tokens.append(new_token)
        return new_token.get()
    except Exception as e:
        logger.error(e)
        raise e


def check_user(user_id: str):
    try:
        clause = f"userid='{user_id}'"
        response = services.mysql.select(table=services.LOGIN_TABLE, where_clause=clause)

        not_exist = True
        for _ in response:
            not_exist = False
        return not_exist
    except Exception as e:
        logger.error(e)
        raise e


def insert_user(user_id: str, user_password: str, user_email: str, user_birthday: str):
    try:
        if check_user(user_id):
            user = model.User(user_id, user_password, user_email, user_birthday)
        else:
            raise RuntimeError('Usuário já existe!')

        user.account_id = services.mysql.bigger(
            table=services.LOGIN_TABLE,
            column='account_id')[0][0] + 1

        services.mysql.insert(
            table=services.LOGIN_TABLE,
            register=user.dict()
        )

        return 'Usuário inserido com sucesso.'
    except Exception as e:
        logger.error(e)
        raise e


def update_password(user, new_password):
    try:
        clause = f"userid='{user.userid}'"
        services.mysql.update(
            table=services.LOGIN_TABLE,
            where_clause=clause,
            register={'user_pass': new_password}
        )
        return 'Senha alterada com sucesso.'
    except Exception as e:
        logger.error(e)
        raise e


def get_user(user_id: str):
    try:
        clause = f"userid='{user_id}'"
        response = services.mysql.select(table=services.LOGIN_TABLE, where_clause=clause)

        user = model.User().set(response[0])
        return user
    except Exception as e:
        logger.error(e)
        raise e
