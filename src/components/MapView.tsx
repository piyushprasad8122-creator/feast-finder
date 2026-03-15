import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

interface MarkerData {
  name: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  markers?: MarkerData[];
}

export default function MapView({ lat = 19.044, lng = 73.02, zoom = 12, markers = [] }: MapViewProps) {
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

    markers.forEach((m) => {
      const popup = new maptilersdk.Popup({ offset: 25 }).setText(m.name);
      new maptilersdk.Marker({ color: "#e11d48" })
        .setLngLat([m.lng, m.lat])
        .setPopup(popup)
        .addTo(map);
    });

    if (markers.length === 0) {
      new maptilersdk.Marker({ color: "#e11d48" }).setLngLat([lng, lat]).addTo(map);
    }

    return () => {
      map.remove();
    };
  }, [lat, lng, zoom, markers]);

  return <div ref={mapContainer} className="w-full h-[400px] rounded-2xl shadow-card" />;
}
