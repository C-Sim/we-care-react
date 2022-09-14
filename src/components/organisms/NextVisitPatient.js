import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

export const NextVisitPatient = () => {
  return (
    <Paper
      sx={{
        p: 6,
        width: "60%",
        height: "60%",
        position: "absolute",
        right: 1,
        top: 150,
      }}
      elevation={6}
    >
      <div>
        <h2>Your Next Appointment - Patient Detail</h2>
        <h4></h4>
        <h4>Start Time: </h4>
      </div>

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
        <Button variant="contained">View past visit notes</Button>
      </Stack>
    </Paper>
  );
};
