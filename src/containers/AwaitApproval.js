// overview of how the service works
import useMediaQuery from "@mui/material/useMediaQuery";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PageTitle } from "../components/atoms/PageTitle";
import signUpImage from "../components/atoms/images/login.png";
import logo from "../components/atoms/images/WeCare-dark.png";
import { Grid } from "@mui/material";

export const AwaitApproval = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <Box
        align="center"
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "18px",
          paddingTop: isMobile ? "4px" : "18px",
        }}
      >
        <PageTitle title="Welcome to" />
        <img alt="logo" src={logo} width="300px" height="80px" />
      </Box>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={signUpImage} width="44%" alt="sign up" />
        <Typography fontSize="1.5rem" fontWeight={100} align="center">
          Your account is under review by one of our supervisors. Please be
          patient with us and try to log in again soon.{" "}
        </Typography>
      </Grid>
    </Stack>
  );
};
