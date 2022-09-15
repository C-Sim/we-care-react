import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import signUpImage from "../atoms/images/login.svg";
import carePlanImage from "../atoms/images/care-plan.svg";
import visitImage from "../atoms/images/home-visit.svg";
import { PageTitle } from "../atoms/PageTitle";

export const HowItWorks = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:750px)");

  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={12} sm={12} md={12} mb={2}>
        <PageTitle title="How It Works" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={signUpImage} width="50%" alt="sign up" />
        <Typography
          sx={{
            fontSize: isMobile ? "0.8rem" : isTablet ? "0.64rem" : "0.84rem",
          }}
          textAlign="center"
          marginTop={3}
          marginBottom={3}
          fontWeight={100}
        >
          1. Sign up
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={carePlanImage} width="80%" alt="care plan" />
        <Typography
          sx={{
            fontSize: isMobile ? "0.8rem" : isTablet ? "0.64rem" : "0.84rem",
          }}
          textAlign="center"
          marginTop={3}
          marginBottom={3}
          fontWeight={100}
        >
          2. Create your personalised Care Plan
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={visitImage} width="60%" alt="visit" />
        <Typography
          sx={{
            fontSize: isMobile ? "0.8rem" : isTablet ? "0.64rem" : "0.84rem",
          }}
          textAlign="center"
          marginTop={3}
          marginBottom={3}
          fontWeight={100}
        >
          3. Our Carers will visit your home
        </Typography>
      </Grid>
    </Grid>
  );
};
