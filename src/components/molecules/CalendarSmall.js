import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ASK_FOR_REALLOCATION } from "../../graphql/mutations";
import { ButtonBright } from "../atoms/ButtonBright";
import { CarerTimeline } from "./CarerTimeline";

export const CalendarSmall = ({ userResults }) => {
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
    console.log("reallocating");
    console.log(e.target.id);
    setAppointmentId(e.target.id);
  };

  const handleReallocationDemand = (e) => {
    console.log("asking supervisor");
    console.log(e.target.id);
    askForReallocation({
      variables: {
        appointmentId,
      },
    });
  };

  console.log(resultArr);
  console.log(calDate);

  return (
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
  );
};
