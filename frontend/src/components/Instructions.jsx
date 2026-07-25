export default function Instructions({ routeData }) {

    if (!routeData) return null;

    const instructions = routeData.route.instructions;

    return (

        <div className="mt-8 bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
                Turn-by-Turn Directions
            </h2>

            <ol className="list-decimal pl-6 space-y-2">

                {instructions.map((step, index) => (

                    <li key={index}>
                        {step}
                    </li>

                ))}

            </ol>

        </div>

    );

}