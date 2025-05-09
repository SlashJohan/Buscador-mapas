import MapWrapper from "@/components/MapWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Buscador de Ubicaciones
      </h1>
      <MapWrapper />
    </main>
  );
}
