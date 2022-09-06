import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const CalendarSmall = () => {
  //fake array of appointments to check if click on date returns the appointments for that day
  //data returned is likely to be of that format - but can be adjusted if needed - which fields do we actually need?
  const userResults = [
    {
      id: "4152856987",
      appointmentDate: "2022-09-06T10:00:00",
      start: "2022-09-06T10:00:00",
      title: "New appointment",
      carerId: {
        firstName: "Mary",
        lastName: "Brown",
        carerProfileId: {
          gender: "female",
        },
      },
      patientId: {
        firstName: "Tania",
        lastName: "James",
        patientProfileId: {
          gender: "female",
          postcode: "B155PZ",
        },
      },
    },
    {
      id: "4157312987",
      appointmentDate: "2022-09-08T09:00:00",
      start: "2022-09-08T09:00:00",
      title: "New meeting",
      carerId: {
        firstName: "Janet",
        lastName: "White",
        carerProfileId: {
          gender: "female",
        },
      },
      patientId: {
        firstName: "Molly",
        lastName: "Brown",
        patientProfileId: {
          gender: "female",
          postcode: "B115PZ",
        },
      },
    },
    {
      id: "4157314001",
      appointmentDate: "2022-09-08T14:00:00",
      start: "2022-09-08T14:00:00",
      title: "Visit to the zoo",
      carerId: {
        firstName: "Alice",
        lastName: "Smith",
        carerProfileId: {
          gender: "female",
        },
      },
      patientId: {
        firstName: "Lena",
        lastName: "Johnson",
        patientProfileId: {
          gender: "female",
          postcode: "B295PZ",
        },
      },
    },
  ];
  // set states of calendar date
  const [calDate, setCalDate] = useState(new Date());
  const [resultArr, setResultArr] = useState([]);

  // render each appointment - this will be replaced by a timeline item - and the div in the main return section will be replaced by a "timeline" type component
  const ResultList = ({ result }) => {
    const dateFormat = new Date(result.appointmentDate);

    const startFormat = new Date(result.start);

    return (
      <div>
        <h2>{dateFormat.toLocaleString()}</h2>
        <ul>
          <li>{startFormat.toString()}</li>
          <li>{result.title}</li>
          <li>
            {result.carerId.firstName} {result.carerId.lastName}
          </li>
          <li>
            {result.patientId.firstName} {result.patientId.lastName}
          </li>
          <li>{result.patientId.patientProfileId.postcode}</li>
        </ul>
      </div>
    );
  };

  const EmptyList = () => {
    return (
      <div className="result-timeline">
        <h3>Your day</h3>
        <h3>No date selected yet or no appointment on that day.</h3>
      </div>
    );
  };

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

  return (
    <div className="weekView-wrapper">
      <div className="weekView-calendar">
        <Calendar onChange={onChange} value={calDate} />
      </div>
      <div className="weekView-timeline">
        {resultArr.length ? (
          resultArr.map((result) => (
            <ResultList result={result} key={result.id} />
          ))
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};
