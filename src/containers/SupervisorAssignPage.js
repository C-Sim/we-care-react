// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Dropdown } from "../components/molecules/Dropdown";
import { CheckList } from "../components/molecules/CheckList";
import { DatePicker } from "../components/atoms/DatePicker";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { Alert } from "@mui/material";

export const SupervisorAssignPage = () => {
  //static data as example - need to query to get the carer and patient arrays
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

  //success state changes on create success
  const [assignSuccess, setAssignSuccess] = useState(true);

  //patients check boxes - retrieving the selected patients' id in a variable
  const [patient, setPatientId] = useState([]);

  const handlePatientSelect = (e) => {
    let data = patient.indexOf(e.target.value);
    if (data === -1) {
      setPatientId([...patient, e.target.value]);
    } else {
      setPatientId(patient.filter((data) => data !== e.target.value));
    }
  };

  //dropdown carer selection - retrieving the selected carer id in a variable
  const [carerId, setCarerId] = useState(patientsArray[0].value);

  const handleCarerSelect = (event) => {
    setCarerId(event.target.value);
  };

  //date picker - retrieving the selected date in a variable
  const [dateValue, setDateValue] = useState(format(new Date(), "yyyy-MM-dd"));

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  //run simulation with selected data (dateValue, carerId, patient)
  //function to be developed > need to retrieve postcode lat/lon or address so we can calculate the distance between each appointment being setup
  const runSimulation = () => {
    console.log("running simulation...");
    //result will be an array of objects to be used as appointmentInput
  };

  //creates appointments with a useMutation and a loop over the array of draft appointments
  const assignAppointments = () => {
    console.log("creating and assigning appointments in db...");
    //useMutation
  };

  return (
    <div>
      <h1>Welcome to the Supervisor assign page</h1>
      <div>
        <h1>A div for the date</h1>
        <DatePicker handleDateChange={handleDateChange} />
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
          handleSelect={handlePatientSelect}
        />
      </div>
      <div>
        <h1>A button</h1>
        <ButtonDark
          label="Build timeline"
          type="button"
          onClick={runSimulation}
        />
      </div>
      <div>
        <h1>A div for the potential timeline</h1>
      </div>
      <div>
        <h1>A button to create the appointments</h1>
        <ButtonDark
          label="Save Appointments"
          type="button"
          onClick={assignAppointments}
        />
      </div>
      <div>
        <h1>A div for a success message</h1>
        {assignSuccess && (
          <Alert severity="success">
            The appointments have been created successfully!
          </Alert>
        )}
      </div>
    </div>
  );
};
