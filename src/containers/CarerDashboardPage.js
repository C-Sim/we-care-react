// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const center = { lat: 52.489471, lng: -1.898575 };

export const CarerDashboardPage = () => {
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
