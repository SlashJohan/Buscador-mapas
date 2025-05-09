"use client";

import { useEffect, useState } from "react";

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  onSelect: (lat: number, lon: number, name: string) => void;
  value: string;
  setValue: (name: string) => void;
};

// Debounce para optimizar llamadas a la API
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export default function LocationSearch({ onSelect, value, setValue }: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Suggestion[]>([]);

  useEffect(() => {
    setQuery(value); // sincroniza el input con el valor externo
  }, [value]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = debounce(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
        {
          signal: controller.signal,
          headers: {
            "Accept-Language": "es",
            "User-Agent": "example@correo.com",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch(() => setResults([]));
    }, 250);

    fetchSuggestions();

    return () => controller.abort();
  }, [query]);

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Buscar lugar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
      />
      <ul className="mt-2 bg-white border border-gray-200 rounded-lg shadow">
        {results.map((item, idx) => (
          <li
            key={idx}
            onClick={() => {
              const lat = parseFloat(item.lat);
              const lon = parseFloat(item.lon);
              onSelect(lat, lon, item.display_name);
              setValue(item.display_name); // actualiza el input externo
              setQuery(item.display_name); // actualiza el input local
              setResults([]); // limpia sugerencias
            }}
            className="p-3 hover:bg-blue-100 cursor-pointer border-b last:border-b-0 text-black"
          >
            {item.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
