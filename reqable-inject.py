# API Docs: https://reqable.com/docs/capture/addons

from reqable import *
import requests

def onRequest(context, request):
    report_data = request.toJson()
    try:
        requests.post(url="http://localhost:8000/request", data=report_data)
    except Exception as e:
        print(e)
        pass
    # Done
    return request


def onResponse(context, response):
    report_data = {
        "request": response.request.toJson(),
        "response": response.toJson()
    }
    try:
        requests.post(url="http://localhost:8000/response", data=report_data)
    except Exception as e:
        print(e)
        pass
    return response
