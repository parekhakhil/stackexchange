import requests
import json

url = "http://api.stackexchange.com/search/advanced"
topic = str(input("Enter the tags you want to search: "))
params = {"q": topic, "site": "stackoverflow", "order": "desc", "sort": "activity"}

data = requests.get(url=url, params=params).json()["items"]

print(len(data))
with open(f"results_{topic}.json", "w") as f:
    f.write(json.dumps(data, indent=4))
