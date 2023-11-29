import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBV2ZSyp55RbSZJcS6OrpZHb4bFVc3Jm8s",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);

  const markers = [
    { lat: 20, lng: 78 },
    { lat: 21, lng: 79 },
    { lat: 19, lng: 90 },
    { lat: 64, lng: 79 },
    { lat: 46, lng: 87 },
    { lat: 10, lng: 130 },
  ];

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-24 text-center">
        <h1 className="text-5xl uppercase magic">
          <span className="magic-text font-bold">Worldwide Span</span>
        </h1>
        <p className="text-2xl capitalize magic-text white" style={{color:"whitesmoke"}}>See live NFTs Markers</p>
      </div>
      <GoogleMap
        center={{ lat: 20, lng: 78 }}
        zoom={3}
        mapContainerStyle={{
          width: "80%",
          height: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "50px",
          marginTop:"30px",
          border: "2px solid white",
          borderRadius: "5px",
        }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </>
  );
};

export default Maps;
