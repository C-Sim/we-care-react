import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ButtonDisabled } from "../atoms/ButtonDisabled";
import { UPDATE_CHECKIN } from "../../graphql/mutations";
import { UPDATE_CHECKOUT } from "../../graphql/mutations";

// example past patient notes
const patientVisitNotesArray = [
  { patientNotes: "please bring some water, thank you" },
  { patientNotes: "please bring some towel, thank you" },
  { patientNotes: "please bring some medicine, thank you" },
  { patientNotes: "please bring some pill, thank you" },
  { patientNotes: "please bring some botton, thank you" },
  { patientNotes: "please bring some botton, thank you" },
];

export const NextVisitForCarer = ({
  appointmentDetail,
  handleStatusChange,
}) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [
    updateCheckin,
    { data: checkinData, loading: checkinLoading, error: checkinError },
  ] = useMutation(UPDATE_CHECKIN, {
    onCompleted: () => {
      setCheckedIn(true);
      handleStatusChange("checkin");
    },
  });
  const [
    updateCheckout,
    { data: checkoutData, loading: checkoutLoading, error: checkoutError },
  ] = useMutation(UPDATE_CHECKOUT, {
    onCompleted: () => {
      setCheckedOut(true);
      handleStatusChange("checkout");
    },
  });

  const status = appointmentDetail.status;

  const [pastVisitNotesBtn, setPastVisitNoteBtn] = useState(false);

  const CheckInAndOut = () => {
    const checkin = (event) => {
      console.log(event.target.id);
      const trigger = "checkin";
      updateCheckin({
        variables: {
          appointmentId: event.target.id,
          trigger,
        },
      });
    };

    const checkout = (event) => {
      console.log(event.target.id);
      const trigger = "checkout";
      updateCheckout({
        variables: {
          appointmentId: event.target.id,
          trigger,
        },
      });
    };

    return (
      <>
        {status === "upcoming" && !checkedIn && (
          <Button
            className="button"
            variant="contained"
            sx={{
              fontWeight: 100,
              backgroundColor: "#00b0ff",
              color: "#eef5dbff",
              "&:hover": { backgroundColor: "#f7b801" },
              borderRadius: "18px",
            }}
            id={appointmentDetail.id}
            onClick={checkin}
          >
            Check In
          </Button>
        )}
        {status === "ongoing" && !checkedOut && (
          <Button
            className="button"
            variant="contained"
            sx={{
              fontWeight: 100,
              backgroundColor: "#00b0ff",
              color: "#eef5dbff",
              "&:hover": { backgroundColor: "#f7b801" },
              borderRadius: "18px",
            }}
            id={appointmentDetail.id}
            onClick={checkout}
          >
            Check Out
          </Button>
        )}
        {status === "ongoing" && checkedOut && (
          <ButtonDisabled label="completed" type="button" />
        )}
        {status === "completed" && (
          <ButtonDisabled label="completed" type="button" />
        )}
      </>
    );
  };

  const BtnUpdateNotes = () => {
    const updateCareNotes = () => {
      console.log("updateCareNotes");
    };
    return (
      <Button variant="Contained" onClick={updateCareNotes}>
        Update care notes
      </Button>
    );
  };

  const BtnPatientProfile = () => {
    const navigate = useNavigate();

    const ViewPatientProfile = () => {
      navigate("/patient-profile", { replace: true });
    };
    return (
      <Button variant="Contained" onClick={ViewPatientProfile}>
        View Patient Profile
      </Button>
    );
  };

  const handlePastVisitNotes = () => {
    setPastVisitNoteBtn(true);
  };

  const PastVisitNotesBtn = () => {
    if (pastVisitNotesBtn) {
      const handleClearNotes = () => {
        setPastVisitNoteBtn(false);
      };
      return (
        <>
          {patientVisitNotesArray.slice(0, 5).map((note, index) => (
            <Typography
              value={note.patientNotes}
              key={index}
              component="h1"
              variant="h6"
              align="left"
              sx={{ mb: 2 }}
            >
              {note.patientNotes}
            </Typography>
          ))}
          <Button variant="contained" onClick={handleClearNotes}>
            Clear all Past Notes
          </Button>
        </>
      );
    }
  };

  return (
    <Paper
      sx={{ p: 3, width: "30%", height: 800, position: "absolute", right: 1 }}
      elevation={6}
    >
      <div>
        <h2>Your Next Appointment - Patient Detail</h2>
        <h4>
          {appointmentDetail.patientId.patientProfileId.username} |
          {appointmentDetail.patientId.patientProfileId.gender} |
          {appointmentDetail.patientId.postcode}
        </h4>
        <h4>Start Time: {appointmentDetail.start}</h4>
      </div>
      <CheckInAndOut />
      <TextField
        sx={{ width: "500px", mt: 2 }}
        id="outlined-textarea"
        label="Your Special Care Requirement"
        multiline
        row={4}
        variant="filled"
      />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        sx={{ p: 2 }}
      >
        <BtnUpdateNotes />
        <Button variant="contained" onClick={handlePastVisitNotes}>
          View past visit notes
        </Button>
        <BtnPatientProfile />
      </Stack>
      <PastVisitNotesBtn />
    </Paper>
  );
};
