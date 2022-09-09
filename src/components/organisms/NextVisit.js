import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

import { useState } from "react";

export const NextVisitForCarer = () => {
  const updateCareNotes = () => {
    console.log("updateCareNotes");
  };
  const viewPastVisitNotes = () => {
    console.log("viewPastVisitNotes");
  };
  const ViewPatientProfile = () => {
    console.log("ViewPatientProfile");
  };
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Paper sx={{ p: 3, width: "30%", height: 800 }} elevation={6}>
      <div>
        <h2>Next Appointment Patient Detail</h2>
        <h4>Name of the Patient | Address of the Patient</h4>
      </div>
      <TextField
        sx={{ width: "500px" }}
        id="outlined-textarea"
        label="Your Special Care Requirement"
        multiline
        row={4}
        value={value}
        onChange={handleChange}
        variant="filled"
      />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ p: 3 }}
      >
        <Button variant="Contained" onClick={updateCareNotes}>
          Update care notes
        </Button>
        <Button variant="contained" onClick={viewPastVisitNotes}>
          View past visit notes
        </Button>
        <Button variant="Contained" onClick={ViewPatientProfile}>
          View Patient Profile
        </Button>
      </Stack>
    </Paper>
  );
};
