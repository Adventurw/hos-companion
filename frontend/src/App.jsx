import Navbar from "./components/Navbar";
import TripForm from "./components/TripForm";

function App() {

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-6xl mx-auto p-8">

                <TripForm />

            </main>

        </div>

    );

}

export default App;