import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import EditIcon from "@mui/icons-material/Edit";

import { ProfileAvatar } from "../components/atoms/Avatar";

import { ButtonBright } from "../components/atoms/ButtonBright";

import { USER_ID } from "../graphql/queries";
import { AppContext } from "../context/AppProvider";

import { LoadingButton } from "@mui/lab";

import { PhoneNumberForm } from "../components/organisms//updateInfo/PhoneNumberForm";

export const PatientsProfilePage = () => {
  debugger;
  //get context
  const context = useContext(AppContext);
  const userId = context.user.id;

  //**************** */
  const [userInfo, setUserInfo] = useState();
  const [
    getUserInfo,
    { data: userInfoData, loading: userInfoLoading, error: userInfoError },
  ] = useLazyQuery(USER_ID);

  useEffect(() => {
    async function fetchData() {
      await getUserInfo({
        variables: {
          userId: userId,
        },
      });
    }
    const fetchedUserInfo = fetchData();
  }, []);

  //phone number
  const [phoneState, setPhoneState] = useState(false);
  //************************* */

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
            My Profile:
          </Typography>
          <Divider />

          <Grid container marginTop={5} marginLeft={4}>
            <Grid item marginRight={4}>
              <ProfileAvatar />
            </Grid>
            <Grid item>
              <ButtonBright label="Update image" type="submit" />
            </Grid>
          </Grid>

          <Typography component="h2" variant="button" align="left">
            Phone number:
          </Typography>
          {userInfoData && (
            <Typography component="h2" variant="button" align="left">
              {userInfoData.phoneNumber}
            </Typography>
          )}
          <EditIcon fontSize="small" />
          <ButtonBright
            label="Edit"
            type="button"
            onClick={() => setPhoneState(true)}
          />
          <PhoneNumberForm />
        </Paper>
      </Grid>
    </Box>
  );
};
