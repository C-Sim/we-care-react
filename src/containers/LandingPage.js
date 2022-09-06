import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const center = { lat: 52.489471, lng: -1.898575 };

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { HowItWorks } from "../components/molecules/HowItWorks";
import { LandingHero } from "../components/molecules/LandingHero";
import { ReviewFixed } from "../components/molecules/ReviewFixed";

export const LandingPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDUUFeATzTUoPA37N2JF00Qzfz-2E_v09w",
  });

  const [map, setMap] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  if (!isLoaded) {
    return <h1>map is not loading</h1>;
  }

  return (
    /* map goes here */
    <>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        onLoad={(map) => setMap(map)}
      />
      {/* displaying markers -render appointments later */}
      <Marker position={center} />
    </>
  );
};
