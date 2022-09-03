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
import Divider from "@mui/material/Divider";
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
import { SIGNUP } from "../../graphql/mutations";
import { ADDRESS_LOOKUP } from "../../graphql/queries";

export const SignUpForm = ({ isMobile }) => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP);

  //dropdown menu
  const [gender, setGender] = useState("");

  const [genderCare, setGenderCare] = useState("");

  // const [anchorEl, setAnchorEl] = useState(null);
  // const openMenu = Boolean(anchorEl);
  // const handleClickMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleCloseMenu = () => {
  //   setAnchorEl(null);
  // };

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
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.signup?.success) {
      navigate("/login", { replace: true });
    }
  }, [data, navigate]);

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
        accountType: "patient",
      };

      signup({
        variables: {
          signupInput,
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

  return (
    <Paper sx={{ p: 3, minWidth: isMobile ? "90%" : "400px" }} elevation={6}>
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

      <Typography component="h1" variant="h4" align="center">
        Sign Up
      </Typography>
      <Divider />
      <Stack
        component="form"
        sx={{ p: 3 }}
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography component="h2" variant="button" align="left">
          Account Details
        </Typography>
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
        <Stack spacing={2}>
          <Typography component="h2" variant="button" align="left">
            Personal Details
          </Typography>
          <TextField
            required
            error={!!errors.firstName}
            label="First name"
            variant="outlined"
            helperText={
              !!errors.firstName ? "Please enter your first name." : ""
            }
            {...register("firstName", {
              required: true,
            })}
          />
          <TextField
            required
            error={!!errors.lastName}
            label="Last name"
            variant="outlined"
            helperText={!!errors.lastName ? "Please enter your last name." : ""}
            {...register("lastName", {
              required: true,
            })}
          />
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
          {/* <Stack spacing={2}> */}
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Postcode
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
              label="Password"
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

          {/* <TextField
            required
            error={!!errors.lastName}
            label="Gender"
            variant="outlined"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickMenu}
          />{" "}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseMenu}>Male</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Female</MenuItem>
          </Menu> */}
        </Stack>
        <Stack spacing={2}>
          <Typography component="h2" variant="button" align="left">
            Care Requirements
          </Typography>
          <Typography variant="caption" align="left">
            Days Care Required*
          </Typography>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space - between",
            }}
          >
            <FormControlLabel control={<Checkbox />} label="Mon" />
            <FormControlLabel control={<Checkbox />} label="Tue" />
            <FormControlLabel control={<Checkbox />} label="Wed" />
            <FormControlLabel control={<Checkbox />} label="Thu" />
            <FormControlLabel control={<Checkbox />} label="Fri" />
            <FormControlLabel control={<Checkbox />} label="Sat" />
            <FormControlLabel control={<Checkbox />} label="Sun" />
          </FormGroup>
        </Stack>
        <Stack spacing={1}>
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
