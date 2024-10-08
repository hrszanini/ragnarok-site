FROM python:3.7-buster
RUN apt update -y
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY src .
CMD ["python","run.py"]
