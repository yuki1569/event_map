import React from "react";
import GoogleMapReact from "google-map-react";

export default function Map() {
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const beaches = [
    ["Bondi Beach", -33.890542, 151.274856, 4],
    ["Coogee Beach", -33.923036, 151.259052, 5],
    ["Cronulla Beach", -34.028249, 151.157507, 3],
    ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
    ["Maroubra Beach", -33.950198, 151.259302, 1],
  ];

  const handleApiLoaded = ({ map, maps }) => {
    beaches.map((beach) => {
      new maps.Marker({
        position: { lat: beach[1], lng: beach[2] },
        map,
        // title: beach[0],
        // zIndex: beach[3],
      });
    });
  };

  return (
      <div style={{ height: "82vh", width: "100%", position:'fixed', top:'11vh' ,zIndex:1 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
          defaultCenter={defaultLatLng}
          defaultZoom={16}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
  );
}
