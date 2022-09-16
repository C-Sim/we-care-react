import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import landingImage from "../atoms/images/landing.png";
import logo from "../atoms/images/WeCare-dark.png";

import { ButtonDark } from "../atoms/ButtonDark";

import { useNavigate } from "react-router-dom";

export const LandingHero = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${landingImage})`,
        backgroundSize: isMobile ? "160% 100%" : "100% 100%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isMobile && (
        <Box height="4.8rem" mb={8}>
          <img src={logo} alt="logo" height="100%" />
        </Box>
      )}

      <Box
        mb={40}
        width="100%"
        sx={{
          textAlign: isMobile ? "right" : "center",
          marginRight: isMobile ? "1rem" : 0,
        }}
      >
        <ButtonDark
          label="Get Started"
          type="button"
          onClick={() => {
            navigate("./login", { replace: true });
          }}
        />
      </Box>
    </Box>
  );
};
