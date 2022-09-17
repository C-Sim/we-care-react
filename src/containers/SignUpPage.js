import Box from "@mui/material/Box";

import useMediaQuery from "@mui/material/useMediaQuery";

import { SignUpForm } from "../components/organisms/SignUpForm";
import signUpImage from "../components/atoms/images/sign-up.png";

export const SignUpPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        minHeight: "95vh",
        margin: 4,
      }}
    >
      <SignUpForm isMobile={isMobile} />
      {!isMobile && (
        <Box
          sx={{
            position: "relative",
            marginTop: "-4%",
            marginLeft: "auto",
            zIndex: 20,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <img src={signUpImage} alt="sign up" height="500vh" />
        </Box>
      )}
    </Box>
  );
};
