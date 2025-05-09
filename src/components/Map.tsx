"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap } from "leaflet";
import { useRef, useState, useEffect } from "react";
import LocationSearch from "@/components/LocationSearch";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function MapInitializer({ mapRef }: { mapRef: React.MutableRefObject<LeafletMap | null> }) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map]);

  return null;
}

export default function Map() {
  const [position, setPosition] = useState<[number, number]>([4.7110, -74.0721]);
  const [selectedPlaceName, setSelectedPlaceName] = useState("");
  const mapRef = useRef<LeafletMap | null>(null);

  async function fetchPlaceNameFromCoords(lat: number, lon: number) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: {
            "Accept-Language": "es",
            "User-Agent": "example@correo.com",
          },
        }
      );
      const data = await res.json();
      return data.display_name || "";
    } catch {
      return "";
    }
  }

  function LocationMarker() {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setPosition([lat, lon]);

        // Fetch y actualiza el nombre del lugar
        const placeName = await fetchPlaceNameFromCoords(lat, lon);
        setSelectedPlaceName(placeName);

        mapRef.current?.flyTo([lat, lon], 17, { duration: 1.5 });
      },
    });

    return <Marker position={position} />;
  }

  function locateUser() {
    if (!navigator.geolocation) {
      alert("La geolocalización no está disponible en tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        mapRef.current?.flyTo([latitude, longitude], 17, { duration: 1.5 });

        const placeName = await fetchPlaceNameFromCoords(latitude, longitude);
        setSelectedPlaceName(placeName);
      },
      () => {
        alert("No se pudo obtener tu ubicación.");
      }
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <LocationSearch
        onSelect={(lat, lon, name) => {
          setPosition([lat, lon]);
          setSelectedPlaceName(name);
          mapRef.current?.flyTo([lat, lon], 17, { duration: 1.5 });
        }}
        value={selectedPlaceName}
        setValue={setSelectedPlaceName}
      />

      <button
        onClick={locateUser}
        className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Usar mi ubicación actual
      </button>

      <div className="rounded overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="h-[500px] w-full"
        >
          <MapInitializer mapRef={mapRef} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}
