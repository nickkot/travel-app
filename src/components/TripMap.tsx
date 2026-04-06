"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Destination {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
}

interface TripMapProps {
  destinations: Destination[];
  className?: string;
}

// City coordinates lookup for demo data
const CITY_COORDS: Record<string, [number, number]> = {
  "New York": [40.7128, -74.006],
  "Los Angeles": [34.0522, -118.2437],
  "Malibu": [34.0259, -118.7798],
  "Chicago": [41.8781, -87.6298],
  "New Orleans": [29.9511, -90.0715],
  "Vancouver": [49.2827, -123.1207],
  "Whistler": [50.1163, -122.9574],
  "Toronto": [43.6532, -79.3832],
  "Quebec City": [46.8139, -71.208],
  "Oaxaca City": [17.0732, -96.7266],
  "Puerto Escondido": [15.8614, -97.0734],
  "Tulum": [20.2115, -87.4294],
  "Guadalajara": [20.6597, -103.3496],
  "Tequila": [20.8823, -103.8373],
  "Tokyo": [35.6762, 139.6503],
  "Kyoto": [35.0116, 135.7681],
  "Osaka": [34.6937, 135.5023],
  "Rome": [41.9028, 12.4964],
  "Reykjavik": [64.1466, -21.9426],
  "Akureyri": [65.6835, -18.0878],
  "El Chalten": [-49.3314, -72.886],
  "Torres del Paine": [-51.2538, -72.3469],
  "Bangkok": [13.7563, 100.5018],
  "Chiang Mai": [18.7883, 98.9853],
  "Bali": [-8.3405, 115.092],
  "Hanoi": [21.0278, 105.8342],
  "Lisbon": [38.7223, -9.1393],
  "Barcelona": [41.3874, 2.1686],
  "Istanbul": [41.0082, 28.9784],
  "Amsterdam": [52.3676, 4.9041],
  "Prague": [50.0755, 14.4378],
  "Dubrovnik": [42.6507, 18.0944],
  "Medellin": [6.2476, -75.5658],
  "Buenos Aires": [-34.6037, -58.3816],
};

function getCoords(dest: Destination): [number, number] | null {
  if (dest.lat !== undefined && dest.lng !== undefined) return [dest.lat, dest.lng];
  return CITY_COORDS[dest.city] || null;
}

export function TripMap({ destinations, className }: TripMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const coords = destinations.map(getCoords).filter((c): c is [number, number] => c !== null);
    if (coords.length === 0) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Custom marker icon matching the app's design
    const pinIcon = L.divIcon({
      className: "trip-map-pin",
      html: `<div style="
        width: 28px; height: 28px;
        background: #c4623a;
        border: 3px solid #faf7f2;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        display: flex; align-items: center; justify-content: center;
      "><div style="width: 8px; height: 8px; background: #faf7f2; border-radius: 50%;"></div></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // Add markers and build polyline
    const markers: L.Marker[] = [];
    destinations.forEach((dest, i) => {
      const c = getCoords(dest);
      if (!c) return;

      const marker = L.marker(c, { icon: pinIcon }).addTo(map);
      const orderLabel = destinations.length > 1 ? `<span style="font-size:10px;color:#7a6850;">${i + 1} of ${destinations.length}</span><br/>` : "";
      marker.bindPopup(
        `<div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 2px;">
          ${orderLabel}
          <strong style="font-size:13px;color:#1a1207;">${dest.city}</strong><br/>
          <span style="font-size:11px;color:#4a3a28;">${dest.country}</span>
        </div>`,
        { closeButton: false, className: "trip-map-popup" }
      );
      markers.push(marker);
    });

    // Draw route line between destinations
    if (coords.length > 1) {
      L.polyline(coords, {
        color: "#1c2b4a",
        weight: 2,
        opacity: 0.5,
        dashArray: "6, 8",
      }).addTo(map);
    }

    // Fit bounds with padding
    if (coords.length === 1) {
      map.setView(coords[0], 10);
    } else {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [destinations]);

  const resolvedCoords = destinations.map(getCoords).filter(Boolean);
  if (resolvedCoords.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-brand-surface rounded-2xl border border-brand-border text-brand-text-muted text-sm py-16 ${className || ""}`}>
        No location data available for this trip
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden border border-brand-border ${className || ""}`}>
      <div ref={mapRef} className="w-full h-[400px]" />
    </div>
  );
}
