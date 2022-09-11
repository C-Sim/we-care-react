import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState, useContext } from "react";

import { useForm } from "react-hook-form";
import { useRef } from "react";

import { useLazyQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
//import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";

import { ButtonBright } from "../components/atoms/ButtonBright";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { UserInfoForm } from "../components/organisms/updateInfo/UserInfoForm";
import { PatientInfoForm } from "../components/organisms/updateInfo/PatientInfoForm";

export const PatientsProfilePage = () => {
  //get context
  const context = useContext(AppContext);

  //navigate back
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate("/patient-dashboard", { replace: true });
  };
  //overall page display
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
        <ButtonBright
          label="Back to Dashboard"
          type="button"
          onClick={handlePageChange}
        />
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

          <Typography component="h1" variant="h4" align="center">
            MY USER DETAILS
          </Typography>
          <Divider />
          <UserInfoForm />
          <Divider />
        </Paper>
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

          <Typography component="h1" variant="h4" align="center">
            MY CARE PREFERENCES
          </Typography>
          <Divider />
          <PatientInfoForm />
          <Divider />
        </Paper>
      </Grid>
    </Box>
  );
};
