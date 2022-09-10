import { useEffect, useState, useMutation } from "react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
//import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
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

import { ADDRESS_LOOKUP } from "../../graphql/queries";
//import { PATIENT_SIGNUP } from "../../graphql/mutations";
import { ProfileAvatar } from "../atoms/Avatar";

import { ButtonBright } from "../atoms/ButtonBright";

import { USER_INFO } from "../../graphql/mutations";

import { AppProvider, useAuth } from "../../context/AppProvider";

export const PatientProfileForm = () => {
  //userInfo
  const [updateUserInfo] = useMutation(USER_INFO);
  const context = AppProvider.context;
  console.log(context);
  //dropdown menu
  const [genderCare, setGenderCare] = useState("");

  //phone number update
  const [phoneState, setPhoneState] = useState(false);
  debugger;
  const handlePhoneUpdate = async (formData) => {
    const userId = "";
    const updateInput = {
      phoneNumber: formData.phoneNumber,
    };
    const updatedPhoneNumber = await updateUserInfo({
      variables: {
        updateInput,
      },
    });
  };

  //days of the week checkbox
  const [day, setDay] = useState([]);

  const [
    addressLookup,
    {
      data: addressLookupData,
      // loading: addressLookupLoading,
      // error: addressLookupError,
    },
  ] = useLazyQuery(ADDRESS_LOOKUP, {
    fetchPolicy: "network-only",
  });

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
  const [showPassword, setShowPassword] = useState(false);
  //const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  //const navigate = useNavigate();

  // useEffect(() => {
  //   if (data?.patientSignup?.success) {
  //     navigate("/patient-dashboard", { replace: true });
  //   }
  // }, [data, navigate]);

  useEffect(() => {
    if (addressLookupData?.addressLookup) {
      handleOpenModal();
    }
  }, [addressLookupData]);

  const onSubmit = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
    } else if (!selectedAddressId) {
      setError("postcode", {
        type: "manual",
        message: "Please select an address",
      });
    } else {
      const signupInput = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        postcode: formData.postcode,
        address: selectedAddressId,
      };

      console.log(signupInput);
      const patientInput = {
        genderPreference: genderCare,
        days: day,
      };
      console.log(patientInput);
      // signup({
      //   variables: {
      //     signupInput,
      //     patientInput,
      //   },
      // });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const toggleShowConfirmedPassword = () => {
  //   setShowConfirmedPassword(!showConfirmedPassword);
  // };

  const handleAddressLookup = () => {
    console.log("searching...");
    console.log(getValues("postcode"));
    addressLookup({
      variables: {
        postcode: getValues("postcode"),
      },
    });
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleAddressSelection = (event) => {
    setSelectedAddressId(event.currentTarget.id);
    const { fullAddress } = addressLookupData?.addressLookup?.addresses.find(
      (each) => each._id === event.currentTarget.id
    );
    setSelectedAddress(fullAddress);
    clearErrors("postcode");
    handleCloseModal();
  };

  const handleChangeGenderCare = (event) => {
    setGenderCare(event.target.value);
  };

  const handleDayValue = (e) => {
    let data = day.indexOf(e.target.value);
    if (data === -1) {
      setDay([...day, e.target.value]);
    } else {
      setDay(day.filter((data) => data !== e.target.value));
    }
  };

  console.log(addressLookupData);
  return (
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
      {/* //address lookup modal */}
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Select Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select one address from the following list:
          </DialogContentText>
          <List>
            {addressLookupData?.addressLookup?.addresses?.map((address) => {
              return (
                <ListItem disablePadding key={address._id}>
                  <ListItemButton
                    onClick={handleAddressSelection}
                    id={address._id}
                  >
                    <ListItemText primary={address.fullAddress} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* form */}
      <Typography component="h1" variant="h4" align="center">
        My Profile
      </Typography>
      <Divider />

      <Grid container marginTop={5} marginLeft={4}>
        <Grid item marginRight={4}>
          {" "}
          <ProfileAvatar />
        </Grid>
        <Grid item>
          <ButtonBright label="Update image" type="submit" />
        </Grid>
      </Grid>
      <Stack
        component="form"
        sx={{ p: 3 }}
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* user account details - needed for signupInput*/}
        <Stack spacing={2}>
          <Typography component="h2" variant="button" align="left">
            Account Details
          </Typography>
          <Typography>Email address</Typography>
          <TextField
            required
            error={!!errors.email}
            label="Email"
            variant="outlined"
            helperText={!!errors.email ? "Please enter a valid email." : ""}
            {...register("email", {
              required: true,
            })}
            sx={{ backgroundColor: "#FFFFFF" }}
          />
          <Typography component="h2" variant="button" align="left">
            My phone number (static)
          </Typography>
          <EditIcon fontSize="small" />
          <FormControl onSubmit={handlePhoneUpdate}>
            <TextField
              name="phone"
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
            <ButtonBright label="Update phone number" type="submit" />
          </FormControl>

          <Grid container sx={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Grid item></Grid>
            <Grid item>
              <Stack spacing={2}>
                <Grid container>
                  <Grid item>
                    <h1> Your phone number</h1>
                  </Grid>
                  <Grid item paddingLeft={2}></Grid>
                </Grid>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <InputLabel htmlFor="postcode">Address</InputLabel>
                  <OutlinedInput
                    id="postcode"
                    type="text"
                    // value={postcode}
                    // onChange={handleOnChangeAddress}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleAddressLookup}
                          onMouseDown={handleAddressLookup}
                          edge="end"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Address"
                    {...register("postcode", {
                      required: true,
                    })}
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                  {!!errors.postcode && (
                    <FormHelperText error={!!errors.postcode}>
                      {errors.postcode?.message}
                    </FormHelperText>
                  )}
                </FormControl>
                {selectedAddress && (
                  <Typography component="div" variant="caption" align="left">
                    {selectedAddress}
                  </Typography>
                )}
              </Stack>
              <Stack spacing={2}>
                <Grid container>
                  {" "}
                  <Grid item>
                    <Typography component="h2" variant="button" align="left">
                      Your Care Requirement Details
                    </Typography>
                  </Grid>
                  <Grid item paddingLeft={2}>
                    <EditIcon fontSize="small" />
                  </Grid>
                </Grid>
              </Stack>
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
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                  <FormControlLabel
                    value="tuesday"
                    control={<Checkbox />}
                    label="Tue"
                    onChange={(e) => handleDayValue(e)}
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                  <FormControlLabel
                    value="wednesday"
                    control={<Checkbox />}
                    label="Wed"
                    onChange={(e) => handleDayValue(e)}
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                  <FormControlLabel
                    value="thursday"
                    control={<Checkbox />}
                    label="Thu"
                    onChange={(e) => handleDayValue(e)}
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                  <FormControlLabel
                    value="friday"
                    control={<Checkbox />}
                    label="Fri"
                    onChange={(e) => handleDayValue(e)}
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                  <FormControlLabel
                    value="saturday"
                    control={<Checkbox />}
                    label="Sat"
                    onChange={(e) => handleDayValue(e)}
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                  <FormControlLabel
                    value="sunday"
                    control={<Checkbox />}
                    label="Sun"
                    onChange={(e) => handleDayValue(e)}
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                </FormGroup>
                {/* preferred gender drop down */}
                <Typography variant="caption" align="left">
                  Preferred Carer Gender*
                </Typography>
                <FormControl>
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
              </Stack>
            </Grid>

            <Stack spacing={2}>
              <ButtonBright label="Update profile" type="submit" />
            </Stack>
          </Grid>
        </Stack>
      </Stack>
    </Paper>
  );
};
