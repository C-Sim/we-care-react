import { useEffect, useState, useContext } from "react";

import { useForm } from "react-hook-form";
import { useRef } from "react";
//import { useNavigate } from "react-router-dom";
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
//import Link from "@mui/material/Link";
import FormHelperText from "@mui/material/FormHelperText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
//import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";

import { ADDRESS_LOOKUP } from "../../../graphql/queries";
//import { PATIENT_SIGNUP } from "../../graphql/mutations";
import { ProfileAvatar } from "../../atoms/Avatar";

import { ButtonBright } from "../../atoms/ButtonBright";

import { PATIENT_PROFILE } from "../../../graphql/mutations";

import { AppContext } from "../../../context/AppProvider";
import { LoadingButton } from "@mui/lab";

export const PatientInfoForm = () => {
  //mutations
  const [updatePatientInfo, { data, loading, error }] =
    useMutation(PATIENT_PROFILE);
  //get context
  const context = useContext(AppContext);
  const userId = context.user.id;

  //form definitions
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  //phone number update
  const [phoneState, setPhoneState] = useState(context.user.phoneNumber);
  const handlePhoneUpdate = (formData) => {
    const updatePatientInput = {
      gender: formData.gender,
    };
    updatePatientInfo({
      variables: {
        userId,
        updatePatientInput,
      },
    });
    const user = context.user;
    user.phoneNumber = formData.phoneNumber;
    context.setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  //form display on the page
  return (
    <Stack
      component="form"
      sx={{ p: 3 }}
      spacing={4}
      onSubmit={handleSubmit(handlePhoneUpdate)}
    >
      <Stack spacing={2}>
        <Typography component="h2" variant="button" align="left">
          Phone number:
        </Typography>
        {context.user.phoneNumber && (
          <Typography component="h2" variant="button" align="left">
            {context.user.phoneNumber}
          </Typography>
        )}
        <FormControl>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            value={phoneState}
            required
            error={!!errors.phoneNumber}
            label="Phone Number"
            variant="outlined"
            helperText={
              !!errors.phoneNumber ? "Please enter your phone number." : ""
            }
            {...register("phoneNumber", {
              required: true,
            })}
            sx={{ backgroundColor: "#FFFFFF" }}
            onChange={(e) => setPhoneState(e.target.value)}
          />
        </FormControl>
      </Stack>
      <Stack spacing={2}>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Update phone number
        </LoadingButton>
        {error && (
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "red" }}
            align="center"
          >
            Failed to update phone number. Please try again.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
