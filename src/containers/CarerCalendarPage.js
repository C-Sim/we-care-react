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
import { Typography } from "@mui/material";
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
          p: 8,
          minWidth: isMobile ? "90%" : "90%",
          marginLeft: isMobile ? 1 : 0,
          marginRight: isMobile ? 1 : 0,
          color: "#00b0ff2e",
          background: `linear-gradient(
            to top,
            rgba(238, 245, 219, 0.2),
            rgba(0, 176, 255, 0.18)
          )`,
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
        <Box
          mt={8}
          display="flex"
          sx={{ flexDirection: isMobile ? "column" : "row" }}
        >
          <Box sx={{ textAlign: "center" }} pb={8}>
            <Typography color="#3f3d56" variant="h6">
              Please select a date to view appointments
            </Typography>
            <Typography
              mb={8}
              textAlign="center"
              color="#3f3d56"
              fontWeight={200}
            >
              Any appointments will show on a timeline
            </Typography>
            <Calendar
              onChange={onChange}
              value={calDate}
              mt={3}
              justifyContent="center"
            />
          </Box>

          {!isMobile && !resultArr.length && (
            <Box
              sx={{
                position: "relative",
                marginTop: "-2%",
                marginLeft: "6%",
                zIndex: 20,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <img src={calendar} height="700vh" />
            </Box>
          )}
          {resultArr.length && (
            <Box
              pb={8}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box width="64%">
                <CarerTimeline
                  date={calDate}
                  appointments={resultArr}
                  viewAppointment={viewReallocateButton}
                  pt={3}
                />
              </Box>
              <Typography align="center" color="#00b0ff" fontWeight={200}>
                Want to make a request to change an appointment? Click on
                patient name to change.
              </Typography>
            </Box>
          )}
          {appointmentId && !askReallocationSuccess && (
            <Box
              sx={{ flexDirection: isMobile ? "row" : "column" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
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
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
