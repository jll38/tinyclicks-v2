"use client";
import React, { useEffect, useRef, useState } from "react";
import { MAPBOX_API_KEY } from "@/lib/constants";
import mapboxgl from "mapbox-gl";
import { Box } from "@mantine/core";

import { useSession } from "next-auth/react";

interface MapboxMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  heatmapData?: {
    maxIntensity?: number;
    radius?: number;
    opacity?: number;
  };
}

export default function Geographypage() {
  return <MapboxMap />;
}
const MapboxMap: React.FC<MapboxMapProps> = ({
  initialCenter = [-74.5, 40],
  initialZoom = 9,
  heatmapData,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { data: session } = useSession();
  const [mapData, setMapData] = useState(null);
  useEffect(() => {
    //Fetch Coordinates
    if (session && session.user)
      //@ts-ignore
      fetch(`/api/dashboard/geography?usr=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMapData(data);
        });

    if (map) {
      addHeatmapLayer(map, heatmapData);
    }
  }, [map, heatmapData, session]);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY || "";
    const initializeMap = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/dark-v11",
      center: initialCenter,
      zoom: initialZoom,
      attributionControl: false,
    });

    initializeMap.on("load", () => {
      setMap(initializeMap);
    });

    return () => initializeMap.remove();
  }, [initialCenter, initialZoom]);

  return (
    <main style={{ width: "95vw" }}>
      <Box ref={mapContainerRef} className="map-container" w={"100%"} h={700} />
    </main>
  );
};

function addHeatmapLayer(
  map: mapboxgl.Map,
  heatmapData?: MapboxMapProps["heatmapData"]
) {
  //@ts-ignore
  if (!heatmapData || !heatmapData.points.length) return;
  //@ts-ignore
  const points = heatmapData.points.map((point) => ({
    type: "Feature",
    properties: {
      weight: point.weight || 1,
    },
    geometry: {
      type: "Point",
      coordinates: [point.lng, point.lat],
    },
  }));
  map.addSource("heatmap-source", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: points,
    },
  });
  map.addLayer({
    id: "heatmap-layer",
    type: "heatmap",
    source: "heatmap-source",
    maxzoom: 9,
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      "heatmap-weight": ["get", "weight"],
      // Increase the heatmap color weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": heatmapData.maxIntensity || 1,
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparency color
      // to create a blur-like effect.
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "blue",
        0.4,
        "cyan",
        0.6,
        "lime",
        0.8,
        "yellow",
        1,
        "red",
      ],
      // Adjust the heatmap radius by zoom level
      "heatmap-radius": heatmapData.radius || 20,
      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": heatmapData.opacity || 0.75,
    },
  });
}
