import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-markercluster";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const App = () => {
  const [center, setCenter] = useState([28.3949, 84.124]);
  const zoom = 7;

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
  });

  useEffect(() => {
    // Get user's current position using geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const hospitals = [
    {
      id: 1,
      name: "Hospital A",
      location: [28.1659898, 84.0660882],
    },
    {
      id: 2,
      name: "Hospital B",
      location: [28.2459898, 84.1460882],
    },
    // Add more hospitals as needed
  ];

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="OpenStreetMap" />

      <MarkerClusterGroup>
        {hospitals.map((hospital) => (
          <Marker key={hospital.id} position={hospital.location} icon={customIcon}>
            <Popup>{hospital.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default App;
