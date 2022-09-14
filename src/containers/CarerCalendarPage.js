// For carers to see their assignments by date

import { useContext, useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { PageTitle } from "../components/atoms/PageTitle";
import { CarerTimeline } from "../components/molecules/CarerTimeline";
import { ButtonBright } from "../components/atoms/ButtonBright";

import { APPOINTMENTS_BY_ID } from "../graphql/queries";
import "react-calendar/dist/Calendar.css";
import { Typography } from "@mui/material";

import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ASK_FOR_REALLOCATION } from "../graphql/mutations";

export const CarerCalendarPage = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS_BY_ID, {
    fetchPolicy: "network-only",
  });

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
    <Box>
      <PageTitle title="Assignments By Date" />
      <div className="weekView-wrapper">
        <div className="weekView-calendar">
          <Calendar onChange={onChange} value={calDate} />
        </div>
        {/* to be replaced by a timeline component */}
        <div className="weekView-timeline">
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
          <div>
            <Typography align="center" color="#00b0ff" fontWeight={200}>
              xxxxxxxxxxxxxxxxxxxxxxx
            </Typography>
          </div>
          <div>
            <Typography align="center" color="#00b0ff" fontWeight={200}>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </Typography>
          </div>
          <div>
            <Typography align="center" color="#00b0ff" fontWeight={200}>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};
