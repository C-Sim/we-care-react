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

import { USER_PROFILE } from "../../../graphql/mutations";

import { AppContext } from "../../../context/AppProvider";
import { LoadingButton } from "@mui/lab";

export const PhoneNumberForm = () => {
  //mutations
  const [updateUserInfo, { data, loading, error }] = useMutation(USER_PROFILE);
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
  const [phoneState, setPhoneState] = useState(false);
  const handlePhoneUpdate = (formData) => {
    debugger;
    const updateInput = {
      phoneNumber: formData.phoneNumber,
    };
    updateUserInfo({
      variables: {
        userId,
        updateInput,
      },
    });
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
        <FormControl>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
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
