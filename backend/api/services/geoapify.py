import requests
from django.conf import settings

BASE_URL = "https://api.geoapify.com"


def geocode(address):

    url = f"{BASE_URL}/v1/geocode/search"

    params = {
        "text": address,
        "apiKey": settings.GEOAPIFY_API_KEY,
        "limit": 1,
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    data = response.json()

    features = data.get("features", [])

    if not features:
        raise ValueError(f"Location not found: {address}")

    coordinates = features[0]["geometry"]["coordinates"]

    return {
        "longitude": coordinates[0],
        "latitude": coordinates[1],
    }

def get_route(current, pickup, dropoff):
    """
    current, pickup and dropoff are dictionaries returned by geocode()
    """

    waypoints = (
        f"{current['latitude']},{current['longitude']}|"
        f"{pickup['latitude']},{pickup['longitude']}|"
        f"{dropoff['latitude']},{dropoff['longitude']}"
    )

    url = f"{BASE_URL}/v1/routing"

    params = {
        "waypoints": waypoints,
        "mode": "drive",
        "details": "instruction_details",
        "apiKey": settings.GEOAPIFY_API_KEY,
    }

    response = requests.get(url, params=params, timeout=20)
    response.raise_for_status()

    return response.json()

def simplify_route(route_data):
    feature = route_data["features"][0]
    props = feature["properties"]

    distance_meters = props["distance"]
    duration_seconds = props["time"]

    geometry = feature["geometry"]["coordinates"]

    instructions = []

    for leg in props["legs"]:
        for step in leg["steps"]:
            instructions.append(
                step["instruction"]["text"]
            )

    return {
        "summary": {
            "distance_km": round(distance_meters / 1000, 2),
            "distance_miles": round(distance_meters / 1609.34, 2),
            "duration_hours": round(duration_seconds / 3600, 2),
        },
        "geometry": geometry,
        "instructions": instructions,
    }