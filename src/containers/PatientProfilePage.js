import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import { UserInfoForm } from "../components/organisms/updateInfo/UserInfoForm";
import { PatientInfoForm } from "../components/organisms/updateInfo/PatientInfoForm";

export const PatientsProfilePage = () => {
  return (
    <Box
      container
      pb={15}
      xs={12}
      sm={12}
      md={6}
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
      <Paper
        sx={{
          mt: 4,
          mb: 4,
          p: 3,
          //minWidth: isMobile ? "90%" : "80%",
          color: "#3f3d56",
          backgroundColor: "#00b0ff2e",
          borderRadius: "25px",
        }}
        elevation={6}
      >
        {/* form */}

        <Typography component="h4" variant="h4" align="center">
          My Personal Details
        </Typography>
        <Divider />
        <UserInfoForm />

        <Typography component="h4" variant="h4" align="center" mt={3}>
          My Care Preferences
        </Typography>
        <Divider />
        <PatientInfoForm />
      </Paper>
      <carePlanImage />
    </Box>
  );
};
