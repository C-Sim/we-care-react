import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

export const NextVisitPatient = () => {
  const CarerCard = () => {
    {
      /* can add carer info: firstName lastName, gender, appointmentCount */
    }
    return (
      <Card sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ maxWidth: 200 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Carers:
          </Typography>
          <CardMedia
            component="img"
            height="100"
            image="https://loremflickr.com/640/480/people?23650"
            alt="green iguana"
          />
          <Typography variant="h7" component="div">
            carer first name and last name, gender
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            total appointment count
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardContent sx={{ maxWidth: 200 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Carers:
          </Typography>
          <CardMedia
            component="img"
            height="100"
            image="https://loremflickr.com/640/480/people?23650"
            alt="green iguana"
          />
          <Typography variant="h7" component="div">
            carer first name and last name, gender
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            total appointment count
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
        <div>
          <CarerCard />
        </div>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <h4>Would you like to add additional requirements?</h4>{" "}
        <TextField
          sx={{ width: "500px", pt: 2 }}
          id="outlined-textarea"
          label="Your Special Care Requirement"
          multiline
          row={4}
          variant="filled"
        />
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ pt: 1, pl: 1 }}
        >
          <Button variant="contained">Submit Requirements</Button>
        </Stack>
      </Box>
    </Paper>
  );
};
