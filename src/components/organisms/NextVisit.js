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

// example past patient notes
const patientVisitNotesArray = [
  { patientNotes: "please bring some water, thank you" },
  { patientNotes: "please bring some towel, thank you" },
  { patientNotes: "please bring some medicine, thank you" },
  { patientNotes: "please bring some pill, thank you" },
  { patientNotes: "please bring some botton, thank you" },
  { patientNotes: "please bring some botton, thank you" },
];

export const NextVisitForCarer = () => {
  const [pastVisitNotesBtn, setPastVisitNoteBtn] = useState(false);

  const CheckInAndOut = () => {
    const [alignment, setAlignment] = useState("");

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    return (
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ p: 2 }}
      >
        <ToggleButton value="web">Check In</ToggleButton>
        <ToggleButton value="android">Check Out</ToggleButton>
      </ToggleButtonGroup>
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
        <h2>Next Appointment Patient Detail</h2>
        <h4>Name of the Patient | Address of the Patient</h4>
      </div>
      <CheckInAndOut />
      <TextField
        sx={{ width: "500px" }}
        id="outlined-textarea"
        label="Your Special Care Requirement"
        multiline
        row={4}
        variant="filled"
      />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ p: 3 }}
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
