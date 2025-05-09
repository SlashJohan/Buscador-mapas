"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p className="text-center">Cargando mapa...</p>,
});

export default function MapWrapper() {
  return <Map />;
}
