from loguru import logger

import services
import mysql.connector


def params(variable: str):
    return variable.replace(';', '')


def select(table: str, where_clause: str = None):
    try:
        query = f"SELECT * FROM {params(table)}"
        if where_clause:
            query += f"{params(where_clause)}"
        query += ';'
        return execute(query)
    except Exception as e:
        logger.error(e)
        raise e


def bigger(table: str, column: str):
    try:
        query = f"SELECT MAX({params(column)}) FROM {params(table)}"
        return execute(query)
    except Exception as e:
        logger.error(e)
        raise e


def insert(table: str, register: dict):
    try:
        query = f'INSERT INTO {params(table)} VALUES '
        first = True
        for key, value in register.items():
            if first:
                first = False
            else:
                query += ','
            query += f'{params(key)}={params(value)}'
        query += ';'
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
            query += f"{params(key)}='{params(value)}'"
        query += f' WHERE {params(where_clause)};'
        return execute(query)
    except Exception as e:
        logger.error(e)
        raise e


def connect():
    try:
        db = mysql.connector.connect(
            host=services.DB_HOST,
            user=services.DB_USER,
            password=services.DB_PASSWORD,
            database=services.DB_DATABASE
        )

        return db
    except Exception as e:
        logger.error(e)
        raise e


def execute(query: str):
    try:
        cursor = connect().cursor()
        cursor.execute(query)
        return cursor
    except Exception as e:
        logger.error(e)
        raise e
