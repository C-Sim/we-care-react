// For carers to see their assignments by date

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { PageTitle } from "../components/atoms/PageTitle";
import { CarerTimeline } from "../components/molecules/CarerTimeline";
import { ButtonBright } from "../components/atoms/ButtonBright";
import useMediaQuery from "@mui/material/useMediaQuery";
import { APPOINTMENTS_BY_ID } from "../graphql/queries";
import "react-calendar/dist/Calendar.css";
import { Grid, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ASK_FOR_REALLOCATION } from "../graphql/mutations";
import calendar from "../components/atoms/images/calendar.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const CarerCalendarPage = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS_BY_ID, {
    fetchPolicy: "network-only",
  });

  const isMobile = useMediaQuery("(max-width:600px)");
  const [userResults, setUserResults] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.appointmentsByUserId) {
      setUserResults(data.appointmentsByUserId);
    }
  }, [data]);

  // set states of calendar date
  const [calDate, setCalDate] = useState(new Date());
  const [resultArr, setResultArr] = useState([]);
  const [appointmentId, setAppointmentId] = useState();
  const [askReallocationSuccess, setAskReallocationSuccess] = useState(false);

  //mutation
  const [
    askForReallocation,
    {
      data: reallocationData,
      loading: reallocationLoading,
      error: reallocationError,
    },
  ] = useMutation(ASK_FOR_REALLOCATION, {
    onCompleted: (reallocationData) => {
      reallocationData.askForReallocation.success &&
        setAskReallocationSuccess(true);
    },
  });

  //onChange of date selection inside small calendar
  const onChange = (calDate) => {
    // change results based on calendar date click
    setCalDate(calDate);

    //get filtered results
    const filteredResults = userResults.filter((result) => {
      const newResultFormat = new Date(result.appointmentDate)
        .toLocaleString()
        .split(",")[0];
      const newCalDateFormat = calDate.toLocaleString().split(",")[0];
      return newResultFormat === newCalDateFormat;
    });

    setResultArr(filteredResults);
  };

  const viewReallocateButton = (e) => {
    setAppointmentId(e.target.id);
  };

  const handleReallocationDemand = (e) => {
    askForReallocation({
      variables: {
        appointmentId,
      },
    });
  };

  //modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const redirectToDashboard = () => {
    navigate("/carer-dashboard", { replace: true });
  };

  return (
    <Box
      bgcolor="#eef5dbff1"
      sx={{
        width: "100%",
        justifyContent: "center",
        minHeight: "95vh",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Paper
        sx={{
          mt: 3,
          mb: 3,
          p: 3,
          minWidth: isMobile ? "90%" : "400px",
          marginLeft: isMobile ? 0 : 18,
          marginRight: isMobile ? 0 : 18,
          color: "#00b0ff2e",
          backgroundColor: "#D1F1FF",
          borderRadius: "25px",
        }}
        elevation={6}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Request for change in appointment</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography align="center" color="#3f3d56" fontWeight={200} p={2}>
                Successfully notified your supervisor. Please wait for approval
                from your supervisor.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-evenly" }}>
            <ButtonBright
              label="Back to Calendar"
              type="button"
              onClick={handleClose}
            />
            <ButtonBright
              label="Back to Dashboard"
              type="button"
              onClick={redirectToDashboard}
            />
          </DialogActions>
        </Dialog>
        <PageTitle title="View Your Appointment Calendar" />
        <Typography
          color="#3f3d56"
          pt={4}
          pl={4}
          variant="h6"
          sx={{ textAlign: isMobile ? "center" : "left" }}
        >
          Please select a date to view appointments
        </Typography>
        <Grid
          container
          rowSpacing={0}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          mt={3}
          paddingLeft={5}
          paddingRight={2}
          alignItems="top"
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Grid item xs={12} s={12} md={4} paddingBottom={5}>
            <Calendar onChange={onChange} value={calDate} pb={3} />
          </Grid>
          {/* {!resultArr.length && (
            <Grid item xs={12} s={12} md={6} pt={8}>
              <Typography color="#3f3d56" fontWeight={200}>
                You have no appointments on the selected date. Please chose
                another date.
              </Typography>
            </Grid>
          )} */}
          {!isMobile && !resultArr.length && (
            <Box
              sx={{
                position: "relative",
                marginTop: "-1%",
                marginLeft: "3%",
                zIndex: 20,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <img src={calendar} height="500vh" />
            </Box>
          )}
          {resultArr.length && (
            <Grid item xs={12} s={12} md={5}>
              <CarerTimeline
                date={calDate}
                appointments={resultArr}
                viewAppointment={viewReallocateButton}
                pt={3}
              />
              <Box item xs={12} s={12} md={2} sx={{ justifyContent: "center" }}>
                <Typography align="center" color="#00b0ff" fontWeight={200}>
                  Want to make a request to change an appointment? Click on
                  patient name to change.
                </Typography>
              </Box>
            </Grid>
          )}

          {appointmentId && !askReallocationSuccess && (
            <Grid item sx={{ paddingTop: isMobile ? 2 : 15 }}>
              <ButtonBright
                id={appointmentId}
                label="Send Request"
                type="button"
                onClick={() => {
                  handleReallocationDemand();
                  handleClickOpen();
                }}
                sx={{ paddingTop: isMobile ? 2 : 20 }}
              />
            </Grid>
          )}

          {appointmentId && !askReallocationSuccess && (
            <div>
              <Typography align="center" color="#00b0ff" fontWeight={200}>
                You cannot ask for another reschedule yet (only 1 request a
                time).
              </Typography>
            </div>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};
