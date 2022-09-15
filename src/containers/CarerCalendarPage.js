// For carers to see their assignments by date

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { PageTitle } from "../components/atoms/PageTitle";
import { CarerTimeline } from "../components/molecules/CarerTimeline";
import { ButtonBright } from "../components/atoms/ButtonBright";
import useMediaQuery from "@mui/material/useMediaQuery";
import { APPOINTMENTS_BY_ID } from "../graphql/queries";
import "react-calendar/dist/Calendar.css";
import { Grid, Typography, Stack } from "@mui/material";
import { Paper, Divider } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ASK_FOR_REALLOCATION } from "../graphql/mutations";
import signUpImage from "../components/atoms/images/sign-up.png";

export const CarerCalendarPage = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS_BY_ID, {
    fetchPolicy: "network-only",
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const [userResults, setUserResults] = useState();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (data && data.appointmentsByUserId) {
      setUserResults(data.appointmentsByUserId);
    }
  }, [data]);

  //this component contains the calendar item and will need to contain the timeline inside it too, so the required states can be set here and not at parent component level

  // set states of calendar date
  const [calDate, setCalDate] = useState(new Date());
  const [resultArr, setResultArr] = useState([]);
  const [appointmentId, setAppointmentId] = useState();
  const [askReallocationSuccess, setAskReallocationSuccess] = useState(false);
  const [noAppointment, setNoAppointment] = useState(false);

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

  const handleText = (e) => {};

  return (
    <Box
      bgcolor="#eef5dbff1"
      sx={{
        width: "100%",
        justifyContent: "center",
        height: "100vh",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Paper
        sx={{
          //m: 4,
          p: 3,
          pb: 15,
          minWidth: "100%",
          color: "#00b0ff2e",
          backgroundColor: "#D1F1FF",
          //borderRadius: "25px",
          //mb: 20,
        }}
        elevation={6}
      >
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
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          <Grid item xs={12} s={12} md={4}>
            <Calendar
              onChange={onChange}
              onClick={() => setHidden((s) => !s)}
              value={calDate}
            />
          </Grid>
          {!resultArr.length && (
            <Grid item xs={12} s={12} md={6} pt={8}>
              <Typography color="#3f3d56" fontWeight={200}>
                You have no appointments on the selected date. Please chose
                another date.
              </Typography>
            </Grid>
          )}
          {!isMobile && !resultArr.length && (
            <Box
              sx={{
                position: "relative",
                marginTop: "-18%",
                marginLeft: "auto",
                zIndex: 20,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <img src={signUpImage} height="500vh" />
            </Box>
          )}
          {resultArr.length && (
            <Grid item xs={12} s={12} md={6}>
              <CarerTimeline
                value={calDate}
                appointments={resultArr}
                viewAppointment={viewReallocateButton}
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
            <Box sx={{ justifyItems: "center", paddingTop: isMobile ? 2 : 20 }}>
              <ButtonBright
                id={appointmentId}
                label="Send Request"
                type="button"
                onClick={handleReallocationDemand}
                sx={{ paddingTop: isMobile ? 2 : 20 }}
              />
            </Box>
          )}

          {/* {appointmentId && !askReallocationSuccess && (
              <div>
                <Typography align="center" color="#00b0ff" fontWeight={200}>
                  You cannot ask for another reschedule yet (only 2 demand at a
                  time).
                </Typography>
              </div>
            )} */}

          {appointmentId && askReallocationSuccess && (
            <Typography
              align="center"
              backgroundColor="#b1ffb1"
              color="#3f3d56"
              fontWeight={200}
              border="1px solid #b1ffb1"
              p={2}
            >
              Successfully notified your supervisor. Please wait for approval.
            </Typography>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};
