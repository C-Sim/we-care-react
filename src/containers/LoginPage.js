import Box from "@mui/material/Box";

import useMediaQuery from "@mui/material/useMediaQuery";

import { LoginForm } from "../components/organisms/LoginForm";
import loginImage from "../components/atoms/images/login.png";

export const LoginPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        minHeight: "95vh",
        margin: 4,
      }}
    >
      <LoginForm isMobile={isMobile} />
      {!isMobile && (
        <Box
          sx={{
            position: "relative",
            marginTop: "-20%",
            marginLeft: "64%",
            zIndex: 20,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <img src={loginImage} alt="login" height="500vh" />
        </Box>
      )}
    </Box>
  );
};
