import TripForm from "../components/TripForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <h1 className="text-3xl font-bold">
            HOS Companion
          </h1>

          <p className="text-blue-100">
            Hours of Service Trip Planner
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <TripForm />
      </main>
    </div>
  );
}