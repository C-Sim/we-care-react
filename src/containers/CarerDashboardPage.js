import zIndex from "@mui/material/styles/zIndex";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useRef, useCallback } from "react";
import { NextVisitForCarer } from "../components/organisms/NextVisit";

export const CarerDashboardPage = () => {
  const center = { lat: 52.489471, lng: -1.898575 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDUUFeATzTUoPA37N2JF00Qzfz-2E_v09w",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const onClick = useCallback(() => {
    if (
      originRef.current &&
      originRef.current.value !== "" &&
      destinationRef.current &&
      destinationRef.current.value !== ""
    ) {
      setOrigin(originRef.current.value);

      setDestination(destinationRef.current.value);
    }
  }, []);

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    console.log(originRef.current.value);
    console.log(destinationRef.current.value);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  if (!isLoaded) {
    return <h1>map is not loading</h1>;
  }

  return (
    /* map goes here */
    <>
      {/* <NextVisitForCarer /> */}

      <Box zIndex="modal">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="ORIGIN">Origin</label>
              <br />
              <input
                id="ORIGIN"
                className="form-control"
                type="text"
                ref={originRef}
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="DESTINATION">Destination</label>
              <br />
              <input
                id="DESTINATION"
                className="form-control"
                type="text"
                ref={destinationRef}
              />
            </div>
          </div>
        </div>
        <div className="map-settings">
          <hr className="mt-0 mb-3" />
          <div>
            <h4>distance: {distance}</h4>
            <h4>duration: {duration}</h4>
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={calculateRoute}
          >
            Build Route
          </button>
        </div>
      </Box>

      <Box>
        {" "}
        <GoogleMap
          center={center}
          zoom={16}
          mapContainerStyle={{
            width: "70%",
            height: "70%",
            position: "absolute",
            top: "200px",
            left: "500px",
          }}
          onLoad={(map) => setMap(map)}
        >
          {/* displaying markers -render appointments later */}
          <Marker position={center} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
        </GoogleMap>
      </Box>
    </>
  );
};
