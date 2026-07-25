export default function HOSTimeline({ routeData }) {

    if (!routeData) return null;

    const used = Number(routeData.trip.cycle_used);

    const remaining = Math.max(70 - used, 0);
    
    const percentUsed = (used / 70) * 100;
    
    let barColor = "bg-green-500";
    let status = "Safe";
    
    if (remaining <= 20) {
        barColor = "bg-yellow-500";
        status = "Approaching Limit";
    }
    
    if (remaining <= 10) {
        barColor = "bg-red-600";
        status = "Critical";
    }

    return (

        <div className="mt-8 bg-white rounded-xl shadow p-6">

            <h3 className="text-2xl font-bold mb-4">
                70-Hour Cycle Status
            </h3>

            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">

                <div
                    className={`${barColor} h-6 transition-all duration-500`}
                    style={{
                        width: `${percentUsed}%`,
                    }}
                />

            </div>
            <p className="mt-3 font-semibold text-lg">
                Status: {status}
            </p>
            <div className="flex justify-between mt-4">

                <div>

                    <p className="text-gray-500">
                        Used
                    </p>

                    <h2 className="font-bold">
                        {used} hrs
                    </h2>

                </div>

                <div className="text-right">

                    <p className="text-gray-500">
                        Remaining
                    </p>

                    <h2 className="font-bold">
                        {remaining.toFixed(1)} hrs
                    </h2>

                </div>

            </div>

        </div>

    );

}