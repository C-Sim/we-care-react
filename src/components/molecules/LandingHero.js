import Box from "@mui/material/Box";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import useMediaQuery from "@mui/material/useMediaQuery";

import landingImage from "../atoms/images/landing.png";

export const LandingHero = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${landingImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ImageListItemBar
        className="image-bar"
        subtitle="Get Started"
        sx={{
          textAlign: "right",
          fontSize: "8px",
          fontWeight: 100,
        }}
      />
    </Box>
  );
};
