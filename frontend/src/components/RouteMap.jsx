import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup,
} from "react-leaflet";
import FitBounds from "./FitBounds";

export default function RouteMap({ routeData }) {

    if (!routeData) return null;

    const geometry = routeData.route.geometry;

    // Convert GeoJSON [lng, lat] -> Leaflet [lat, lng]
    const routeCoordinates = geometry.flat().map(point => [
        point[1],
        point[0],
    ]);
    
    const current = [
        routeData.locations.current.latitude,
        routeData.locations.current.longitude,
    ];

    const pickup = [
        routeData.locations.pickup.latitude,
        routeData.locations.pickup.longitude,
    ];
    
    const dropoff = [
        routeData.locations.dropoff.latitude,
        routeData.locations.dropoff.longitude,
    ];

    return (

        <div className="mt-8">

            <h3 className="text-2xl font-bold mb-4">
                Route Map
            </h3>

            <MapContainer
                center={current}
                zoom={6}
                style={{
                    height: "500px",
                    width: "100%",
                }}
            >
                <FitBounds coordinates={routeCoordinates} />
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={current}>
                    <Popup>
                        <strong>Current Location</strong>
                        <br />
                        {routeData.trip.current_location}
                    </Popup>
                </Marker>

                <Marker position={pickup}>
                    <Popup>
                        <strong>Pickup Location</strong>
                        <br />
                        {routeData.trip.pickup_location}
                    </Popup>
                </Marker>

                <Marker position={dropoff}>
                    <Popup>
                        <strong>Dropoff Location</strong>
                        <br />
                        {routeData.trip.dropoff_location}
                    </Popup>
                </Marker>

                <Polyline
                    positions={routeCoordinates}
                />

            </MapContainer>

        </div>

    );

}