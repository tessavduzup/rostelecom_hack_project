FROM python:latest

RUN apt-get update && apt-get install python3-pip -y && pip install --upgrade pip && pip install pipenv

RUN mkdir -p /usr/src/rostelecom_analytics_app/

WORKDIR /usr/src/rostelecom_analytics_backend/

COPY . /usr/src/rostelecom_analytics_backend/

EXPOSE 5000

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "app.main:app", "--reload"]
