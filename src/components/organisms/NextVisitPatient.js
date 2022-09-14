import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const NextVisitPatient = () => {
  const CarerCard = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Carers:
          </Typography>
          <Typography variant="h5" component="div">
            bedrnabfrg
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    );
  };

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
        <h2>Your Appointment on Date:(date) - Patient Detail</h2>
        <h4>Start Time: </h4>
        {/* can add carer info: firstName lastName, gender, appointmentCount */}

        <div>
          <CarerCard />
        </div>
      </div>
      <h4>Would you like to add additional requirements?</h4>
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
        spacing={1}
        sx={{ pt: 2 }}
      >
        <Button variant="contained">Submit Requirements</Button>
      </Stack>
    </Paper>
  );
};
