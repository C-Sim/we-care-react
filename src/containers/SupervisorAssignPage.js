// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Dropdown } from "../components/molecules/Dropdown";
import { CheckList } from "../components/molecules/CheckList";
import { CarerTimeline } from "../components/molecules/CarerTimeline";
import { DatePicker } from "../components/atoms/DatePicker";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { Alert } from "@mui/material";
import { ButtonDisabled } from "../components/atoms/ButtonDisabled";

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

  //date picker - retrieving the selected date in a variable
  const [dateValue, setDateValue] = useState(format(new Date(), "yyyy-MM-dd"));

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  //then locking the date for the next step of the assigning process
  const [selectedDate, setSelectedDate] = useState();
  const [dateLock, setDateLock] = useState(false);
  const saveSelectedDate = () => {
    setDateLock(true);
    setSelectedDate(format(new Date(dateValue), "yyyy-MM-dd"));
  };

  //retrieve the list of available carers
  // const [
  //   availableCarers,
  //   { data: carerData, loading: carerLoading, error: carerError },
  // ] = useLazyQuery(CARER_LOOKUP, {
  //   fetchPolicy: "network-only",
  // });
  //need to add the query into graphql>queries

  //dropdown carer selection - retrieving the selected carer id in a variable **CHECK DATA GETS SAVED**
  const [carerId, setCarerId] = useState(patientsArray[0].value);
  const [selectedCarer, setSelectedCarer] = useState(patientsArray[0].label);
  const handleCarerSelect = (event) => {
    setCarerId(event.target.value);
    setSelectedCarer(event.target.label);
  };
  //then locking the carer for the next step of the assigning process
  const [carerLock, setCarerLock] = useState(false);
  const saveSelectedCarer = () => {
    setCarerLock(true);
  };

  //retrieving the available patients for this carer

  //patients check boxes - retrieving the selected patients' id in a variable
  const [patient, setPatientId] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);

  const handlePatientSelect = (e) => {
    let data = patient.indexOf(e.target.value);
    if (data === -1) {
      setPatientId([...patient, e.target.value]);
      setSelectedPatients([...selectedPatients, e.target.label]);
    } else {
      setPatientId(patient.filter((data) => data !== e.target.value));
      setSelectedPatients(
        selectedPatients.filter((data) => data !== e.target.label)
      );
    }
  };

  //then locking the patients for the next step of the assigning process
  const [patientLock, setPatientLock] = useState(false);
  const saveSelectedPatients = () => {
    setPatientLock(true);
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
        {!dateLock && (
          <ButtonDark
            label="Use this date"
            type="button"
            onClick={saveSelectedDate}
          />
        )}
        {dateLock && <ButtonDisabled label="Date saved" type="button" />}
        <h1>Selected date: {selectedDate}</h1>
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
        {!carerLock && (
          <ButtonDark
            label="Use this carer"
            type="button"
            onClick={saveSelectedCarer}
          />
        )}
        {carerLock && <ButtonDisabled label="Carer saved" type="button" />}
        {carerLock && <h1>Selected carer: {selectedCarer}</h1>}
      </div>
      <div>
        <h1>A div for patients selection</h1>
        <CheckList
          patientsArray={patientsArray}
          handleSelect={handlePatientSelect}
        />
        <ButtonDark
          label="Use these patients"
          type="button"
          disabled={patientLock}
          onClick={saveSelectedPatients}
        />
        {patientLock && (
          <div>
            <h1>Selected patients:</h1>
            <ul>
              {selectedPatients.map((result) => {
                return (
                  <li key={result} value={result}>
                    {result}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
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
