// For Carers to view their own profile

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import { ButtonBright } from "../components/atoms/ButtonBright";
import { AppContext } from "../context/AppProvider";
import { UserInfoForm } from "../components/organisms/updateInfo/UserInfoForm";

export const CarerProfilePage = () => {
  //get context
  const context = useContext(AppContext);

  //navigate back
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate("/carer-dashboard", { replace: true });
  };
  //overall page display
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
      {/* <Grid>
        <ButtonBright
          label="Back to Dashboard"
          type="button"
          onClick={handlePageChange}
        /> */}
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
        <Divider />

        <Typography
          component="h5"
          variant="h6"
          color="#00B0FF"
          align="left"
          pt={3}
        >
          Shift Pattern Changes?
        </Typography>
        <Typography component="h6" variant="h6" align="left" pt={3}>
          If you would like make changes to your shift patterns, please contact
          your supervisor.
        </Typography>
      </Paper>
      {/* </Grid> */}
    </Box>
  );
};
