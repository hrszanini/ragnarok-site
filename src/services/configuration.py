import os

RESOURCES_PATH = "./resources"
LOGIN_TABLE = "login"
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_USER')
DB_HOST = os.getenv('DB_HOST')
DB_DATABASE = os.getenv('DB_USER')

__all__ = ["RESOURCES_PATH", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_DATABASE", "LOGIN_TABLE"]
