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
  //state for update success
  const [patientSuccess, setPatientSuccess] = useState(false);
  const [patientMessage, setPatientMessage] = useState(false);
  //mutations
  const [updatePatientInfo, { data, loading, error }] = useMutation(
    PATIENT_PROFILE,
    {
      onCompleted: (data) => {
        console.log(data.updatePatientInfo);
        setPatientSuccess(true);
      },
    }
  );
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

  //gender preference update
  const [genderCare, setGenderCare] = useState("");
  const handleChangeGenderCare = (event) => {
    if (patientMessage === true) {
      setPatientMessage(false);
    }
    setGenderCare(event.target.value);
  };

  //care days update
  const [day, setDay] = useState([]);
  const handleDayValue = (e) => {
    if (patientMessage === true) {
      setPatientMessage(false);
    }

    let data = day.indexOf(e.target.value);
    if (data === -1) {
      setDay([...day, e.target.value]);
    } else {
      setDay(day.filter((data) => data !== e.target.value));
    }
  };

  const handlePatientUpdate = () => {
    debugger;
    const updatePatientInput = {};

    if (genderCare) {
      updatePatientInput.genderPreference = genderCare;
    }

    if (day.length) {
      updatePatientInput.days = day;
    }

    const isEmpty = (updatePatientInput) => {
      return Object.keys(updatePatientInput).length === 0;
    };

    const objectStatus = isEmpty(updatePatientInput);

    if (!objectStatus) {
      updatePatientInfo({
        variables: {
          userId,
          updatePatientInput,
        },
      });
    } else {
      setPatientMessage(true);
    }
  };

  //form display on the page
  return (
    <Stack
      component="form"
      sx={{ p: 3 }}
      spacing={4}
      onSubmit={handleSubmit(handlePatientUpdate)}
    >
      <Stack spacing={2}>
        <Typography variant="caption" align="left">
          Days Care Required*
        </Typography>

        {/* check boxes */}
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space - between",
          }}
        >
          <FormControlLabel
            value="monday"
            control={<Checkbox />}
            label="Mon"
            onChange={(e) => handleDayValue(e)}
          />
          <FormControlLabel
            value="tuesday"
            control={<Checkbox />}
            label="Tue"
            onChange={(e) => handleDayValue(e)}
          />
          <FormControlLabel
            value="wednesday"
            control={<Checkbox />}
            label="Wed"
            onChange={(e) => handleDayValue(e)}
          />
          <FormControlLabel
            value="thursday"
            control={<Checkbox />}
            label="Thu"
            onChange={(e) => handleDayValue(e)}
          />
          <FormControlLabel
            value="friday"
            control={<Checkbox />}
            label="Fri"
            onChange={(e) => handleDayValue(e)}
          />
          <FormControlLabel
            value="saturday"
            control={<Checkbox />}
            label="Sat"
            onChange={(e) => handleDayValue(e)}
          />
          <FormControlLabel
            value="sunday"
            control={<Checkbox />}
            label="Sun"
            onChange={(e) => handleDayValue(e)}
          />
        </FormGroup>
        {/* preferred gender drop down */}
        <Typography variant="caption" align="left">
          Preferred Carer Gender*
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="gendercare">Gender</InputLabel>
          <Select
            labelId="gendercare"
            id="gendercare"
            value={genderCare}
            label="Gender"
            onChange={handleChangeGenderCare}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack spacing={2}>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Update care preferences
        </LoadingButton>
        {error && (
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "red" }}
            align="center"
          >
            Failed to update care preferences. Please try again.
          </Typography>
        )}
        {patientSuccess && (
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "green" }}
            align="center"
          >
            Care preferences successfully updated!
          </Typography>
        )}
        {patientMessage && (
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "red" }}
            align="center"
          >
            You must enter at least one update to be able to proceed.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};