import { useState } from "react";
import api from "../api/api";
import SummaryCard from "./SummaryCard";
import Instructions from "./Instructions";
import RouteMap from "./RouteMap";
import HOSAnalysis from "./HOSAnalysis";
import HOSTimeline from "./HOSTimeline";

export default function TripForm() {

    const [trip, setTrip] = useState({
      current_location: "",
      pickup_location: "",
      dropoff_location: "",
      cycle_used: "",
    });

   const [loading, setLoading] = useState(false);
   const [routeData, setRouteData] = useState(null);
   const [error, setError] = useState("");

    function handleChange(e) {
        setTrip({
            ...trip,
            [e.target.name]: e.target.value
        });
    }

   const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await api.post("/route/", trip);
    console.log(response.data);
    setRouteData(response.data);

  } catch (err) {
    console.error(err);
    setError("Unable to generate route.");

  }

  setLoading(false);
};

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
                Plan Trip
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid gap-5"
            >

                <input
                    name="current_location"
                    placeholder="Current Location"
                    value={trip.current_location}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    name="pickup_location"
                    placeholder="Pickup Location"
                    value={trip.pickup_location}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    name="dropoff_location"
                    placeholder="Dropoff Location"
                    value={trip.dropoff_location}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    type="number"
                    name="cycle_used"
                    placeholder="Current Cycle Used (Hours)"
                    value={trip.cycle_used}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <button
                    disabled={loading}
                    className={`rounded-lg p-3 font-semibold text-white transition ${
                        loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                
                    {loading ? (
                
                        <div className="flex items-center justify-center gap-3">
                
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                
                            Calculating Route...
                
                        </div>
                
                    ) : (
                
                        "Generate Route"
                
                    )}
                
                </button>

            </form>
            {error && (
                <div className="mt-6 text-red-600">
                    {error}
                </div>
            )}
            <SummaryCard routeData={routeData} />
            <HOSTimeline routeData={routeData} />
            <Instructions routeData={routeData}/>
            <RouteMap routeData={routeData} />
            <HOSAnalysis routeData={routeData} />
        </div>
      
    );

}