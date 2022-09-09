import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

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
  return (
    <Paper sx={{ p: 3, width: "30%", height: 450 }} elevation={6}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
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
