import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import { PageTitle } from "../components/atoms/PageTitle";
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
      }}
    >
      <Paper
        sx={{
          mt: 4,
          p: 3,
          //minWidth: isMobile ? "90%" : "80%",
          color: "#3f3d56",
          background: `linear-gradient(
            to top,
            rgba(238, 245, 219, 0.2),
            rgba(0, 176, 255, 0.18)
          )`,
          borderRadius: "25px",
        }}
        elevation={6}
      >
        {/* form */}

        <PageTitle title="My Personal Details" />

        <UserInfoForm />

        <PageTitle title="My Care Preferences" />

        <PatientInfoForm />
      </Paper>
      <carePlanImage />
    </Box>
  );
};
