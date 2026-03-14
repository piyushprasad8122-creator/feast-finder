import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [72.8777, 19.076],
      zoom: 11,
    });

    new maptilersdk.Marker().setLngLat([72.8777, 19.076]).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} className="w-full h-[400px] rounded-lg" />;
}
