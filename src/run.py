import fastapi
import uvicorn

import controllers

app = fastapi.FastAPI()

controllers.configure_page_routes(app)
controllers.configure_api_routes(app)
controllers.configure_test_routes(app)

uvicorn.run(app, host="0.0.0.0", port=8080)
