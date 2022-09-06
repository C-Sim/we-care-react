import Box from "@mui/material/Box";

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box mb={18} textAlign="center">
        <ButtonDark label="Get Started" type="button" />
      </Box>
    </Box>
  );
};
