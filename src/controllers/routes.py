import fastapi
import services


def configure_page_routes(app: fastapi.FastAPI):
    @app.get('/')
    def home_page():
        return html_file('index.html')

    @app.get('/{file}')
    def html_file(file: str):
        html_file_path = '{}/html/{}'.format(services.RESOURCES_PATH, file)
        return fastapi.responses.HTMLResponse(open(html_file_path, 'r', encoding='utf8').read())

    @app.get('/css/{file}')
    def css_file(file: str):
        css_file_path = '{}/css/{}'.format(services.RESOURCES_PATH, file)
        return fastapi.responses.HTMLResponse(open(css_file_path, 'r', encoding='utf8').read())

    @app.get('/js/{file}')
    def css_file(file: str):
        js_file_path = '{}/js/{}'.format(services.RESOURCES_PATH, file)
        return fastapi.responses.HTMLResponse(open(js_file_path, 'r', encoding='utf8').read())

    @app.get('/img/{file}')
    def css_file(file: str):
        img_file_path = '{}/img/{}'.format(services.RESOURCES_PATH, file)
        return fastapi.responses.FileResponse(img_file_path, media_type='img/png')


def configure_api_routes(app: fastapi.FastAPI):
    @app.get('/api/check_user/{user_id}')
    def get_check_user(user_id: str):
        return services.check_user(user_id)

    @app.post('/api/add_user')
    def post_add_user(user_id: str, user_password: str, user_email: str, user_birthday: str):
        return services.insert_user(user_id, user_password, user_email, user_birthday)
