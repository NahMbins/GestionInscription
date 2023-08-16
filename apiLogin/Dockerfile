FROM python:3.9
WORKDIR /backendFastAPI
COPY requirements.txt /backendFastAPI/
RUN pip install -r /backendFastAPI/requirements.txt
COPY . /backendFastAPI/
CMD ["uvicorn","main:app","--proxy-headers","--host","0.0.0.0","--port","8000"]