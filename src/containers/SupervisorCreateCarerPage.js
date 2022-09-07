// For the supervisor only - to be able to create a new carer in the database
import Grid from "@mui/material/Grid";
import landingImage from "../components/atoms/images/landing.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CreateCarerForm } from "../components/organisms/CreateCarer";

export const SupervisorCreateCarerPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Grid container sx={{ minHeight: "95vh" }}>
      {!isMobile && (
        <Grid item md={3}>
          <img src={landingImage} alt="sign-up-image" />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(
            to top,
            rgba(20, 20, 20, 0.2),
            rgba(133, 133, 133, 0.2)
          )`,
        }}
      >
        <CreateCarerForm isMobile={isMobile} />
      </Grid>
    </Grid>
  );
};
