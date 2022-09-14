import { Typography } from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ButtonBright } from "../atoms/ButtonBright";
import { CarerTimeline } from "./CarerTimeline";

export const CalendarSmall = ({ userResults }) => {
  //this component contains the calendar item and will need to contain the timeline inside it too, so the required states can be set here and not at parent component level

  // set states of calendar date
  const [calDate, setCalDate] = useState(new Date());
  const [resultArr, setResultArr] = useState([]);
  const [appointmentDetail, setAppointmentDetail] = useState();

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
    setAppointmentDetail(e.target.id);
  };

  const askForReallocation = (e) => {
    console.log("asking supervisor");
    console.log(e.target.id);
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
        {/* {resultArr.length ? (
          resultArr.map((result) => (
            <ResultList result={result} key={result.id} />
          ))
        ) : (
          <EmptyList />
        )} */}
        {resultArr.length && (
          <CarerTimeline
            date="2022-09-13"
            appointments={resultArr}
            viewAppointment={viewReallocateButton}
          />
        )}
        {appointmentDetail && (
          <div>
            <Typography align="center" color="#00b0ff" fontWeight={200}>
              Do you need to ask for a rescheduling?
            </Typography>
            <ButtonBright
              id={appointmentDetail}
              label="Ask for reallocation"
              type="button"
              onClick={askForReallocation}
            />
          </div>
        )}
      </div>
    </div>
  );
};
