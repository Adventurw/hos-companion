export default function HOSAnalysis({ routeData }) {

    if (!routeData) return null;

    const cycleUsed = Number(routeData.trip.cycle_used);
    const driveTime = routeData.route.summary.duration_hours;

    const total = cycleUsed + driveTime;
    const remaining = 70 - total;
    const progress = Math.min((total / 70) * 100, 100);

    const remainingDriving = 11 - driveTime;

    let recommendation = "";
    
    if (remaining <= 0) {
        recommendation =
            "❌ This trip exceeds the 70-hour cycle limit. Reset your cycle before starting.";
    }
    else if (remaining < 5) {
        recommendation =
            "⚠ Very little cycle time remains. Plan your next reset carefully.";
    }
    else if (driveTime > 8) {
        recommendation =
            "☕ A 30-minute break will be required during this trip.";
    }
    else {
        recommendation =
            "✅ No mandatory break required for this trip.";
    }
    
    let status = "";
    let color = "";

    if (remaining > 10) {
        status = "Safe to Drive";
        color = "bg-green-100 text-green-700";
    }
    else if (remaining > 0) {
        status = "Approaching HOS Limit";
        color = "bg-yellow-100 text-yellow-700";
    }
    else {
        status = "HOS Limit Exceeded";
        color = "bg-red-100 text-red-700";
    }

    return (

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">

            <h3 className="text-2xl font-bold mb-6">
                HOS Analysis
            </h3>

            <div className={`rounded-xl p-5 mb-6 text-center font-bold text-xl ${color}`}>

                {status}

            </div>
            <div className="mb-6">

                <div className="flex justify-between mb-2">
            
                    <span className="font-semibold">
                        Cycle Usage
                    </span>
            
                    <span>
                        {total.toFixed(2)} / 70 hrs
                    </span>
            
                </div>
            
                <div className="w-full bg-gray-200 rounded-full h-5">
            
                    <div
                        className={`h-5 rounded-full transition-all duration-700 ${
                            remaining > 10
                                ? "bg-green-500"
                                : remaining > 0
                                ? "bg-yellow-500"
                                : "bg-red-600"
                        }`}
                        style={{
                            width: `${progress}%`,
                        }}
                    />
            
                </div>
            
            </div>
            <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-slate-100 rounded-lg p-4">
                    <p>Current Cycle</p>
                    <h2>{cycleUsed.toFixed(1)} hrs</h2>
                </div>

                <div className="bg-slate-100 rounded-lg p-4">
                    <p>Trip Time</p>
                    <h2>{driveTime.toFixed(2)} hrs</h2>
                </div>

                <div className="bg-slate-100 rounded-lg p-4">
                    <p>Total Cycle</p>
                    <h2>{total.toFixed(2)} hrs</h2>
                </div>

                <div className="bg-slate-100 rounded-lg p-4">
                    <p>Remaining</p>
                    <h2>{remaining.toFixed(2)} hrs</h2>
                </div>
                
                <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">

                    <h4 className="font-bold text-lg mb-2">
                        Recommendation
                    </h4>
                
                    <p>
                        {recommendation}
                    </p>
                
                </div>
            </div>

        </div>

    );

}