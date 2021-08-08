from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import requests
from .throttle import PerMinThrottle, PerDayThrottle
from django.core.paginator import Paginator

# Create your views here.
def get_data(topic, pagesize):
    url = "http://api.stackexchange.com/search/advanced"
    params = {
        "q": topic,
        "pagesize": pagesize,
        "site": "stackoverflow",
        "order": "desc",
        "sort": "activity",
    }

    data = requests.get(url=url, params=params).json()["items"]

    return data


class SearchView(APIView):
    throttle_classes = [PerMinThrottle, PerDayThrottle]
    def get(self, request, *args, **kwargs):
        print(request.GET)
        topic = request.GET.get("query")
        pagesize = 50
        results = get_data(topic, pagesize)
        paginator = Paginator(results, 10)
        page = request.GET.get("page", 1)
        results = paginator.get_page(page)
        data = {}
        if results.has_previous():
            data["previous_page_number"] = results.previous_page_number()
        if results.has_next():
            data["has_next"] = results.has_next()
            data["next_page_number"] = results.next_page_number()
        data["count"] = pagesize
        data["current"] = page
        print("Page", data["current"])
        if int(page) > (int(data["count"])) / 10:
            return Response(
                {"status": False, "error": "This is the last page"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        data["search_results"] = results.object_list
        return Response(data, status=status.HTTP_200_OK)
