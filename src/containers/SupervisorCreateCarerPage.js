// For the supervisor only - to be able to create a new carer in the database
import Grid from "@mui/material/Grid";
import carer from "../components/atoms/images/carer.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CreateCarerForm } from "../components/organisms/CreateCarer";

export const SupervisorCreateCarerPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Grid container sx={{ minHeight: "95vh" }}>
      {!isMobile && (
        <Grid item md={3}>
          <img src={carer} alt="carers" />
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
        }}
      >
        <CreateCarerForm isMobile={isMobile} />
      </Grid>
    </Grid>
  );
};
