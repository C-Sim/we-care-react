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
import CardActions from "@mui/material/CardActions";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { format } from "date-fns";

export const NextVisitPatient = ({ appointmentDetail }) => {
  const CarerCard = () => {
    return (
      <Card sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ maxWidth: 200 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Carers:
          </Typography>
          <CardMedia
            component="img"
            height="100"
            image={appointmentDetail.carerId.imageUrl}
            alt="Carer image"
          />
          <Typography variant="h7" component="div">
            {appointmentDetail.carerId.carerProfileId.username}
          </Typography>
          <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
            {appointmentDetail.carerId.email}
          </Typography>
          <Typography variant="body2">
            Total Appointment Completed：
            {appointmentDetail.carerId.carerProfileId.appointmentCount}
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
        <h2>
          Your Appointment on Date:{" "}
          {
            new Date(appointmentDetail.appointmentDate)
              .toLocaleString()
              .split(",")[0]
          }
        </h2>
        <h4>
          Start Time: {format(new Date(appointmentDetail.start), "HH:mm")}
        </h4>
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
          <Button size="small" variant="contained">
            Submit Requirements
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
