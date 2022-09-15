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

  //mutation

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
    console.log(e.target.id);
  };

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
      </div>
    </div>
  );
};
