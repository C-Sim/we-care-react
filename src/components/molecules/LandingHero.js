import Box from "@mui/material/Box";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import useMediaQuery from "@mui/material/useMediaQuery";

import landingImage from "../atoms/images/landing.png";
import { ButtonDark } from "../atoms/ButtonDark";

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
      {/* <ImageListItemBar
        className="image-bar"
        subtitle="Get Started"
        sx={{
          textAlign: "right",
          fontSize: "8px",
          fontWeight: 100,
          width: "50%",
        }}
      > */}
      <ButtonDark
        label="Get Started"
        type="button"
        sx={{ position: "absolute", top: "50%", right: "50%" }}
      />
      {/* </ImageListItemBar> */}
    </Box>
  );
};
