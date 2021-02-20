from loguru import logger

import model
import services


def check_user(user_id: str):
    try:
        clause = f'user_id={user_id}'
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
            column='account_id') + 1

        services.mysql.insert(
            table=services.LOGIN_TABLE,
            register=user.dict()
        )

        return 'Usuário inserido com sucesso.'
    except Exception as e:
        logger.error(e)
        raise e


def update_password(user_id, user_password):
    try:
        if not check_user(user_id):
            raise RuntimeError('Usuário não existe!')
        clause = f'user_id = {user_id}'
        users = services.mysql.select(
            table=services.LOGIN_TABLE,
            where_clause=clause
        )
        for _ in users:
            services.mysql.update(
                table=services.LOGIN_TABLE,
                where_clause=clause,
                register={'user_pass': user_password}
            )
            break
        return 'Senha alterada com sucesso.'
    except Exception as e:
        logger.error(e)
        raise e


