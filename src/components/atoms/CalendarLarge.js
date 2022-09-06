import React, { useState } from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

//fake array of appointments to check if click on date returns the appointments for that day
//data returned is likely to be of that format - but can be adjusted if needed - which fields do we actually need?
// const userResults = [
//   {
//     id: "4152856987",
//     appointmentDate: "2022-09-06T10:00:00",
//     start: "2022-09-06T10:00:00",
//     end: "2022-09-06T11:00:00",
//     title: "New appointment",
//     carerId: {
//       firstName: "Mary",
//       lastName: "Brown",
//       carerProfileId: {
//         gender: "female",
//       },
//     },
//     patientId: {
//       firstName: "Tania",
//       lastName: "James",
//       patientProfileId: {
//         gender: "female",
//         postcode: "B155PZ",
//       },
//     },
//   },
//   {
//     id: "4157312987",
//     appointmentDate: "2022-09-08T09:00:00",
//     start: "2022-09-08T09:00:00",
//     end: "2022-09-08T10:00:00",
//     title: "New meeting",
//     carerId: {
//       firstName: "Janet",
//       lastName: "White",
//       carerProfileId: {
//         gender: "female",
//       },
//     },
//     patientId: {
//       firstName: "Molly",
//       lastName: "Brown",
//       patientProfileId: {
//         gender: "female",
//         postcode: "B115PZ",
//       },
//     },
//   },
//   {
//     id: "4157314001",
//     appointmentDate: "2022-09-08T14:00:00",
//     start: "2022-09-08T14:00:00",
//     end: "2022-09-08T15:00:00",
//     title: "Visit to the zoo",
//     carerId: {
//       firstName: "Alice",
//       lastName: "Smith",
//       carerProfileId: {
//         gender: "female",
//       },
//     },
//     patientId: {
//       firstName: "Lena",
//       lastName: "Johnson",
//       patientProfileId: {
//         gender: "female",
//         postcode: "B295PZ",
//       },
//     },
//   },
// ];

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarLarge = ({ userResults }) => {
  //setting up state variables at calendar level
  const [calDate, setCalDate] = useState("");
  const [selectedDateData, setSelectedDateData] = useState([]);

  //setting up the functions to handle the state change
  const handleSelectDate = (event) => {
    const selectedDate = new Date(event.start);
    setCalDate(selectedDate);

    //get filtered results
    const filteredResults = userResults.filter((result) => {
      const newResultFormat = new Date(result.appointmentDate)
        .toLocaleString()
        .split(",")[0];
      const newCalDateFormat = calDate.toLocaleString().split(",")[0];
      return newResultFormat === newCalDateFormat;
    });

    setSelectedDateData(filteredResults);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={userResults}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectDate}
        onSelectEvent={(eventInfo) => {
          console.log(eventInfo);
        }}
        selectable
        popup={true}
      />
    </div>
  );
};
