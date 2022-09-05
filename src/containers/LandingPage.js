import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const center = { lat: 52.489471, lng: -1.898575 };

export const LandingPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });

  if (!isLoaded) {
    return <h1>map is not loading</h1>;
  }

  return (
    /* map goes here */
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "30%", height: "100%", position: "absolute" }}
    >
      {/* displaying markers etc */}
    </GoogleMap>
  );
};
