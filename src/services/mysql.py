from loguru import logger

import services
import mysql.connector


def params(variable: str):
    if type(variable) is not str:
        variable = str(variable)
    return variable.replace(';', '')


def select(table: str, where_clause: str = None):
    try:
        query = f"SELECT * FROM {params(table)}"
        if where_clause:
            query += f" WHERE {params(where_clause)}"
        query += ';'
        return execute(query)
    except Exception as e:
        logger.error(e)
        raise e


def bigger(table: str, column: str):
    try:
        query = f"SELECT MAX({params(column)}) FROM {params(table)};"
        return execute(query)
    except Exception as e:
        logger.error(e)
        raise e


def insert(table: str, register: dict):
    try:
        query1 = f'INSERT INTO {params(table)} ('
        query2 = f') VALUES ('

        first = True
        for key, value in register.items():
            if value is not None:
                if first:
                    first = False
                else:
                    query1 += ','
                    query2 += ','
                query1 += f"{params(key)}"
                query2 += f"'{params(value)}'"

        query = f'{query1}{query2});'
        return execute(query)
    except Exception as e:
        logger.error(e)
        raise e


def update(table: str, where_clause: str, register: dict):
    try:
        query = f'UPDATE {params(table)} SET '
        first = True
        for key, value in register.items():
            if first:
                first = False
            else:
                query += ','

            if value:
                query += f"{params(key)}='{params(value)}'"
            else:
                query += f"{params(key)}=NULL"

        query += f' WHERE {params(where_clause)};'
        return execute(query)
    except Exception as e:
        logger.error(e)
        raise e


def execute(query: str):
    try:
        logger.debug(f'Executando: {query}')
        connection = mysql.connector.connect(
            host=services.DB_HOST,
            user=services.DB_USER,
            password=services.DB_PASSWORD,
            database=services.DB_DATABASE
        )
        cursor = connection.cursor()
        cursor.execute(query)
        response = []
        for result in cursor:
            response.append(result)
        return response
    except Exception as e:
        logger.error(e)
        raise e
