"use client";
import React, { useEffect, useRef, useState } from "react";
import { MAPBOX_API_KEY } from "@/lib/constants";
const mapboxgl = require("mapbox-gl");

import { Box } from "@mantine/core";

const MapboxMap = ({ initialCenter = [-74.5, 40], initialZoom = 9 }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY;
    const initializeMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: initialCenter,
      zoom: initialZoom,
      attributionControl: false,
    });

    initializeMap.on("load", () => {
      setMap(initializeMap);
    });

    // Clean up on unmount
    return () => initializeMap.remove();
  }, []); // Empty array ensures this effect runs only once on mount

  return (
    <main style={{ width: "95vw"}}>
      <Box
        ref={mapContainerRef}
        className="map-container"
        w={"100%"}
        h={700}
      />

    </main>
  );
};

export default MapboxMap;
