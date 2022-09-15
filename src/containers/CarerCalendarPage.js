// For carers to see their assignments by date

import { useState, useEffect } from "react";

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

export const CarerCalendarPage = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS_BY_ID, {
    fetchPolicy: "network-only",
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const [userResults, setUserResults] = useState();

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

  return (
    <Box
      bgcolor="#eef5dbff1"
      sx={{
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          m: 4,
          p: 3,
          minWidth: isMobile ? "90%" : "80%",
          color: "#00b0ff2e",
          backgroundColor: "#D1F1FF",
          borderRadius: "25px",
        }}
        elevation={6}
      >
        <PageTitle title="View Your Appointment Calendar" />

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          paddingLeft={3}
          paddingRight={3}
          alignItems="top"
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          <Grid item xs={3}>
            <Calendar onChange={onChange} value={calDate} />
          </Grid>
          <Grid item xs={9}>
            {/* <div className="weekView-wrapper">
              <div className="weekView-calendar"></div>
              {/* to be replaced by a timeline component */}

            {resultArr.length && (
              <CarerTimeline
                date="2022-09-13"
                appointments={resultArr}
                viewAppointment={viewReallocateButton}
              />
            )}
            {appointmentId && !askReallocationSuccess && (
              <div>
                <Typography align="center" color="#00b0ff" fontWeight={200}>
                  Do you need to ask for a rescheduling?
                </Typography>
                <ButtonBright
                  id={appointmentId}
                  label="Ask for reallocation"
                  type="button"
                  onClick={handleReallocationDemand}
                />
              </div>
            )}
            {appointmentId && !askReallocationSuccess && (
              <div>
                <Typography align="center" color="#00b0ff" fontWeight={200}>
                  You cannot ask for another reschedule yet (only 2 demand at a
                  time).
                </Typography>
              </div>
            )}
            {appointmentId && askReallocationSuccess && (
              <div>
                <Typography align="center" color="#00b0ff" fontWeight={200}>
                  Successfully notified your supervisor. Wait for approval.
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
