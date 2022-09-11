import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { useMutation } from "@apollo/client";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";

import { PATIENT_PROFILE } from "../../../graphql/mutations";
import { AppContext } from "../../../context/AppProvider";

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
      <Typography variant="caption" align="left">
        Days you require care
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
        Your Preferred Gender of Carer
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="gendercare">Gender</InputLabel>
        <Select
          labelId="gendercare"
          id="gendercare"
          value={genderCare}
          label="Gender"
          onChange={handleChangeGenderCare}
          sx={{ backgroundColor: "#FFFFFF" }}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <Stack spacing={4}>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Update your care preferences
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
