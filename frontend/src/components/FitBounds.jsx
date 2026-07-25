import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function FitBounds({ coordinates }) {

    const map = useMap();

    useEffect(() => {

        if (!coordinates.length) return;

        const bounds = L.latLngBounds(coordinates);

        map.fitBounds(bounds, {
            padding: [40, 40],
        });

    }, [coordinates, map]);

    return null;
}