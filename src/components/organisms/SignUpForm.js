import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Link from "@mui/material/Link";
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
import { PATIENT_SIGNUP } from "../../graphql/mutations";
import { ADDRESS_LOOKUP } from "../../graphql/queries";

export const SignUpForm = ({ isMobile }) => {
  const [signup, { data, loading, error }] = useMutation(PATIENT_SIGNUP);

  //dropdown menu
  const [gender, setGender] = useState("");

  const [genderCare, setGenderCare] = useState("");

  //days of the week checkbox
  const [day, setDay] = useState([]);

  const [
    addressLookup,
    {
      data: addressLookupData,
      loading: addressLookupLoading,
      error: addressLookupError,
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
    mode: "all",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState();
  const [selectedAddress, setSelectedAddress] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.patientSignup?.success) {
      navigate("/login", { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (addressLookupData?.addressLookup) {
      handleOpenModal();
    }
  }, [addressLookupData]);

  const onSubmit = (formData) => {
    debugger;
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
    } else if (formData.imageUrl) {
      const isValidUrl = (urlString) => {
        var urlPattern = new RegExp(
          "^(https?:\\/\\/)?" + // validate protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // validate fragment locator
        return !!urlPattern.test(urlString);
      };
      const isValid = isValidUrl(formData.imageUrl);
      if (isValid) {
        const signupInput = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          postcode: formData.postcode,
          address: selectedAddressId,
          imageUrl: formData.imageUrl,
        };

        const patientInput = {
          gender: gender,
          genderPreference: genderCare,
          days: day,
        };

        signup({
          variables: {
            signupInput,
            patientInput,
          },
        });
      } else {
        setError("imageUrl", {
          type: "manual",
          message: "Please enter a valid URL",
        });
      }
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

      const patientInput = {
        gender: gender,
        genderPreference: genderCare,
        days: day,
      };

      signup({
        variables: {
          signupInput,
          patientInput,
        },
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmedPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const handleAddressLookup = () => {
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

  const handleChangeGender = (event) => {
    setGender(event.target.value);
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

  return (
    <Paper
      sx={{
        p: 3,
        minWidth: isMobile ? "90%" : "400px",
        marginLeft: isMobile ? 0 : 18,
        marginRight: isMobile ? 0 : 18,

        zIndex: 10,
        position: "relative",
        background: `linear-gradient(
    to top,
    rgba(238, 245, 219, 0.2),
    rgba(0, 176, 255, 0.18)
  )`,
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
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{
          color: "#3f3d56",
          fontWeight: 400,
        }}
      >
        Sign Up
      </Typography>

      <Stack
        component="form"
        sx={{ p: 3 }}
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* user account details - needed for signupInput*/}
        <Stack spacing={2}>
          <Typography component="h2" variant="button" align="left">
            User account Details
          </Typography>
          <TextField
            required
            error={!!errors.firstName}
            label="First name"
            variant="outlined"
            helperText={
              getValues("firstName")?.length < 2
                ? "Please enter at least 2 characters"
                : !!errors.firstName
                ? "Please enter your first name."
                : ""
            }
            {...register("firstName", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.firstName && (
            <FormHelperText error={errors.firstName}>
              {errors.firstName?.message || ""}
            </FormHelperText>
          )}
          <TextField
            required
            error={!!errors.lastName}
            label="Last name"
            variant="outlined"
            helperText={
              getValues("firstName")?.length < 2
                ? "Please enter at least 2 characters"
                : !!errors.lastName
                ? "Please enter your first name."
                : ""
            }
            {...register("lastName", {
              required: true,
              minLength: 2,
            })}
          />
          <TextField
            required
            error={!!errors.email}
            label="Email"
            variant="outlined"
            helperText={!!errors.email ? "Please enter a valid email." : ""}
            {...register("email", {
              required: true,
            })}
          />
          <TextField
            label="Image URL"
            error={!!errors.imageUrl}
            variant="outlined"
            {...register("imageUrl", {
              required: false,
            })}
          />
          {!!errors.imageUrl && (
            <FormHelperText error={!!errors.imageUrl}>
              {errors.imageUrl?.message}
            </FormHelperText>
          )}
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel error={!!errors.password} htmlFor="password">
              Password
            </InputLabel>
            <OutlinedInput
              error={!!errors.password}
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    onMouseDown={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register("password", {
                required: true,
              })}
            />
            {!!errors.password && (
              <FormHelperText error={!!errors.password}>
                Please enter a valid password.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel
              error={!!errors.confirmPassword}
              htmlFor="confirm-password"
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              error={!!errors.confirmPassword}
              id="confirm-password"
              type={showConfirmedPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={toggleShowConfirmedPassword}
                    onMouseDown={toggleShowConfirmedPassword}
                    edge="end"
                  >
                    {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => getValues("password") === value,
              })}
            />
            {errors.confirmPassword && (
              <FormHelperText error={!!errors.confirmPassword}>
                {errors.confirmPassword?.message || "Passwords do not match."}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
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
          />
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="postcode">Postcode</InputLabel>
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
              label="Postcode"
              {...register("postcode", {
                required: true,
              })}
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
          {/* patient account details - needed for patientInput*/}
          <Typography component="h2" variant="button" align="left">
            Profile Details
          </Typography>
          {/* drop down menu */}
          <FormControl>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={gender}
              label="Gender"
              onChange={handleChangeGender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <Typography component="h2" variant="button" align="left">
            Care Requirements
          </Typography>
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
              label="None"
              onChange={handleChangeGenderCare}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing={2}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{
              fontWeight: 100,
              backgroundColor: "#3f3d56",
              color: "#eef5dbff",
              "&:hover": { backgroundColor: "#f7b801" },
              borderRadius: "18px",
            }}
          >
            Sign Up
          </LoadingButton>
          <Typography variant="caption" component="div" align="center">
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
          {error && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "red" }}
              align="center"
            >
              Failed to sign up. Please try again.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
