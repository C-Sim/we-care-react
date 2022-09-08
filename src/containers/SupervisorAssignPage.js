// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Dropdown } from "../components/molecules/Dropdown";
import { CheckList } from "../components/molecules/CheckList";
import { MobileDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";

export const SupervisorAssignPage = () => {
  const patientsArray = [
    {
      value: "63185053e763bfb7288867cc",
      label: "Alexane Dooley",
    },
    {
      value: "63185053e763bfb7288867ce",
      label: "Jules Wehner",
    },
    {
      value: "63185053e763bfb7288867d0",
      label: "Grover Langworth",
    },
    {
      value: "63185053e763bfb7288867d2",
      label: "Sarah Wunsch",
    },
    {
      value: "63185053e763bfb7288867d4",
      label: "Mateo Gorczany",
    },
    {
      value: "63185053e763bfb7288867xc",
      label: "Bob Smith",
    },
    {
      value: "63185053e763bfb7288867xv",
      label: "Alice Smith",
    },
    {
      value: "63185053e763bfb7288867xb",
      label: "Jane Smith",
    },
  ];

  //patients check boxes
  const [patient, setPatientId] = useState([]);

  const handleSelectPatient = (e) => {
    let data = patient.indexOf(e.target.value);
    if (data === -1) {
      setPatientId([...patient, e.target.value]);
    } else {
      setPatientId(patient.filter((data) => data !== e.target.value));
    }
  };

  //dropdown carer selection
  //need to bring the state variables here instead of in component
  const [carerId, setCarerId] = useState(patientsArray[0].value);

  const handleCarerSelect = (event) => {
    setCarerId(event.target.value);
  };

  console.log(carerId);
  //date picker
  // const [dateValue, setDateValue] = useState(format(new Date(), "yyyy-MM-DD"));

  // const handleDateChange = (newValue) => {
  //   setDateValue(newValue);
  // };

  return (
    <div>
      <h1>Welcome to the Supervisor assign page</h1>
      <div>
        <h1>A div for the date</h1>
        {/* <MobileDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      </div>
      <div>
        <h1>A div for carers selection</h1>
        <Dropdown
          label="Select Carer"
          helperText=""
          defaultSelection={patientsArray[0].value}
          options={patientsArray}
          handleSelect={handleCarerSelect}
        />
      </div>
      <div>
        <h1>A div for patients selection</h1>
        <CheckList
          patientsArray={patientsArray}
          handleSelectPatient={handleSelectPatient}
        />
      </div>
      <div>
        <h1>A button</h1>
      </div>
      <div>
        <h1>A div for the potential timeline</h1>
      </div>
      <div>
        <h1>A button to create the appointments</h1>
      </div>
      <div>
        <h1>A div for a success message</h1>
      </div>
    </div>
  );
};
