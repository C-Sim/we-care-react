import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

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

import { USER_PROFILE } from "../../../graphql/mutations";
import { ADDRESS_LOOKUP } from "../../../graphql/queries";
import { AppContext } from "../../../context/AppProvider";

export const UserInfoForm = () => {
  //state for update success
  const [userSuccess, setUserSuccess] = useState(false);
  //mutations
  const [updateUserInfo, { data, loading, error }] = useMutation(USER_PROFILE, {
    onCompleted: (data) => {
      context.setUser(data.updateUserInfo.user);
      localStorage.setItem("user", JSON.stringify(data.updateUserInfo.user));
      setUserSuccess(true);
    },
  });
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

  //variables for update
  const [phoneUpdate, setPhoneUpdate] = useState(context.user.phoneNumber);
  const [emailUpdate, setEmailUpdate] = useState(context.user.email);

  const handleUserUpdate = (formData) => {
    const updateInput = {
      phoneNumber: formData.phoneNumber,
      email: formData.email,
    };

    if (selectedAddressId) {
      updateInput.postcode = formData.postcode;
      updateInput.address = selectedAddressId;
    }
    updateUserInfo({
      variables: {
        userId,
        updateInput,
      },
    });
  };

  //address lookup update
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
  const [open, setOpen] = useState(false);
  const [postcodeUpdate, setPostcodeUpdate] = useState(context.user.postcode);
  const [selectedAddressId, setSelectedAddressId] = useState();
  const [selectedAddress, setSelectedAddress] = useState(
    context.user.address.fullAddress
  );

  useEffect(() => {
    if (addressLookupData?.addressLookup) {
      handleOpenModal();
    }
  }, [addressLookupData]);

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

  //form display on the page
  return (
    <div>
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
      <Stack
        component="form"
        sx={{ p: 3 }}
        spacing={4}
        onSubmit={handleSubmit(handleUserUpdate)}
      >
        <Typography
          component="h6"
          variant="h6"
          align="center"
          sx={{
            color: "#3f3d56",
            fontWeight: 100,
            fontSize: 18,
          }}
        >
          You only need to make changes in the fields you'd like to update
        </Typography>
        <Stack spacing={4}>
          <FormControl pb={40}>
            <TextField
              pb={80}
              id="email"
              name="email"
              value={emailUpdate}
              required
              error={!!errors.email}
              label="Email"
              variant="outlined"
              helperText={!!errors.email ? "Please enter your email." : ""}
              {...register("email", {
                required: true,
              })}
              sx={{ backgroundColor: "#FFFFFF" }}
              onChange={(e) => setEmailUpdate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              value={phoneUpdate}
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
              onChange={(e) => setPhoneUpdate(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="postcode">Postcode</InputLabel>
            <OutlinedInput
              id="postcode"
              name="postcode"
              placeholder={postcodeUpdate}
              onChange={(e) => setPostcodeUpdate(e.target.value)}
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
                required: false,
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
            <Typography component="h1" variant="button" align="center">
              {selectedAddress}
            </Typography>
          )}
        </Stack>
        <Stack spacing={4}>
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
            Update my personal details
          </LoadingButton>
          {error && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "red" }}
              align="center"
            >
              Failed to update user info. Please try again.
            </Typography>
          )}
          {userSuccess && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "green" }}
              align="center"
            >
              User details successfully updated!
            </Typography>
          )}
        </Stack>
      </Stack>
    </div>
  );
};
