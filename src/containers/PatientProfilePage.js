import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { PatientProfileForm } from "../components/organisms/PatientProfileForm";

//import signUpImage from "../components/atoms/images/sign-up.svg";

export const PatientsProfilePage = () => {
  return (
    <Box
      container
      xs={12}
      sm={12}
      md={6}
      sx={{
        minHeight: "95vh",
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
      <Grid>
        <PatientProfileForm />
      </Grid>
    </Box>
  );
};
