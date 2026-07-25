from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import TripSerializer
from .services.geoapify import geocode, get_route, simplify_route


@api_view(["POST"])
def route(request):
    serializer = TripSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    trip = serializer.validated_data

    try:
        current = geocode(trip["current_location"])
        pickup = geocode(trip["pickup_location"])
        dropoff = geocode(trip["dropoff_location"])

        route_data = get_route(current, pickup, dropoff)
        simplified = simplify_route(route_data)

        return Response(
    {
        "trip": trip,

        "locations": {
            "current": current,
            "pickup": pickup,
            "dropoff": dropoff,
        },

        "route": simplified,
    },
    status=status.HTTP_200_OK,
)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )