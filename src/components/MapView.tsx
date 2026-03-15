import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

interface MapViewProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

export default function MapView({ lat = 19.076, lng = 72.8777, zoom = 11 }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    maptilersdk.config.apiKey = "GJ2rB3ndX5ObID8HUZlJ";

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [lng, lat],
      zoom,
    });

    new maptilersdk.Marker().setLngLat([lng, lat]).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng, zoom]);

  return <div ref={mapContainer} className="w-full h-[400px] rounded-lg" />;
}
