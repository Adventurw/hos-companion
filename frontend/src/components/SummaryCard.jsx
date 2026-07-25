export default function SummaryCard({ routeData }) {

    if (!routeData) return null;

    return (

        <div className="mt-8">

            <h3 className="text-2xl font-bold mb-6">
                Trip Summary
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-slate-100 rounded-lg p-4 shadow">
                    <p className="text-gray-500">Distance</p>

                    <h2 className="text-2xl font-bold">
                        {routeData.route.summary.distance_miles} miles
                    </h2>

                    <p className="text-gray-500">
                        ({routeData.route.summary.distance_km} km)
                    </p>

                </div>

                <div className="bg-slate-100 rounded-lg p-4 shadow">

                    <p className="text-gray-500">
                        Driving Time
                    </p>

                    <h2 className="text-2xl font-bold">
                        {routeData.route.summary.duration_hours} hrs
                    </h2>

                </div>

                <div className="bg-slate-100 rounded-lg p-4 shadow">

                    <p className="text-gray-500">
                        Cycle Used
                    </p>

                    <h2 className="text-2xl font-bold">
                        {routeData.trip.cycle_used} hrs
                    </h2>

                </div>

                <div className="bg-slate-100 rounded-lg p-4 shadow">

                    <p className="text-gray-500">
                        Remaining Cycle
                    </p>

                    <h2 className="text-2xl font-bold">
                        {(70 - routeData.trip.cycle_used).toFixed(1)} hrs
                    </h2>

                </div>

            </div>

        </div>

    );

}