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
import { AVAILABLE_CARERS } from "../graphql/queries";
import { AVAILABLE_PATIENTS } from "../graphql/queries";
import { CREATE_APPOINTMENTS } from "../graphql/mutations";
import { addHours } from "date-fns";

export const SupervisorAssignPage = () => {
  //static data as example - need to query to get the carer and patient arrays
  // const patientsArray = [
  //   {
  //     value: "63185053e763bfb7288867cc",
  //     label: "Alexane Dooley",
  //   },
  //   {
  //     value: "63185053e763bfb7288867ce",
  //     label: "Jules Wehner",
  //   },
  //   {
  //     value: "63185053e763bfb7288867d0",
  //     label: "Grover Langworth",
  //   },
  //   {
  //     value: "63185053e763bfb7288867d2",
  //     label: "Sarah Wunsch",
  //   },
  //   {
  //     value: "63185053e763bfb7288867d4",
  //     label: "Mateo Gorczany",
  //   },
  //   {
  //     value: "63185053e763bfb7288867xc",
  //     label: "Bob Smith",
  //   },
  //   {
  //     value: "63185053e763bfb7288867xv",
  //     label: "Alice Smith",
  //   },
  //   {
  //     value: "63185053e763bfb7288867xb",
  //     label: "Jane Smith",
  //   },
  // ];

  //mutations
  const [
    getAvailableCarers,
    { data: carerData, loading: carerLoading, error: carerError },
  ] = useLazyQuery(AVAILABLE_CARERS, {
    fetchPolicy: "network-only",
  });
  const [
    getAvailablePatients,
    { data: patientData, loading: patientLoading, error: patientError },
  ] = useLazyQuery(AVAILABLE_PATIENTS, {
    fetchPolicy: "network-only",
  });
  const [
    createAppointments,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_APPOINTMENTS, {
    onCompleted: (data) => {
      data.createAppointments.success && setAssignSuccess(true);
    },
  });

  //success state changes on create success
  const [assignSuccess, setAssignSuccess] = useState(false);

  //date picker - retrieving the selected date in a variable
  const [dateValue, setDateValue] = useState(format(new Date(), "yyyy-MM-dd"));
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  //then locking the date and triggering retrieval of the available carers
  const [selectedDate, setSelectedDate] = useState();
  const [dateLock, setDateLock] = useState(false);
  const [carersArray, setCarersArray] = useState([]);
  const saveSelectedDate = () => {
    setDateLock(true);
    setSelectedDate(format(new Date(dateValue), "yyyy-MM-dd"));
    getAvailableCarers({
      variables: {
        selectedDate,
      },
    });
    setCarersArray(carerData.availableCarersByDate);
  };

  //formatting the list of available carers retrieved on date lock to feed into dropdown with correct field names
  const formatForSelect = (array) => {
    return array.map((i) => {
      return {
        value: i.userId,
        label: i.username,
      };
    });
  };

  //dropdown carer selection - retrieving the selected carer id in a variable **CHECK DATA GETS SAVED**
  const [carerId, setCarerId] = useState();
  const [carerValue, setCarerValue] = useState();
  const handleCarerSelect = (event) => {
    setCarerId(event.target.value);
    setCarerValue(event.target.label);
  };
  //then locking the carer and retrieving the corresponding available patients
  const [carerLock, setCarerLock] = useState(false);
  const [selectedCarer, setSelectedCarer] = useState();
  const [patientsArray, setPatientsArray] = useState([]);
  const saveSelectedCarer = () => {
    setCarerLock(true);
    const fullCarer = {
      carerId,
      carerName: carerValue,
    };
    setSelectedCarer(fullCarer);
    getAvailablePatients({
      variables: {
        userId: selectedCarer,
        selectedDate,
      },
    });
    setPatientsArray(patientData.availablePatientsByCarerGenderAndDay);
  };

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
  const [patientList, setPatientList] = useState();
  const saveSelectedPatients = () => {
    setPatientLock(true);
    const fullPatient = patient.map((i) =>
      patientsArray.filter((p) => p.userId === i)
    );
    setPatientList(fullPatient);
  };

  //run simulation with selected data (dateValue, carerId, patient)
  const [simulatedAppointments, setSimulatedAppointments] = useState();

  //function to be developed > need to retrieve postcode lat/lon or address so we can calculate the distance between each appointment being setup
  const runSimulation = () => {
    console.log("running simulation...");
    //pass the 3 info needed
    const carerId = selectedCarer.carerId;
    const status = "upcoming";
    let appointmentDate = new Date(selectedDate).setUTCHours(8, 0, 0);

    //map over patients array to create appointments
    const draftData = patientList.map((i) => {
      const patientId = i.value;
      const title = `Visit to ${i.label} by ${selectedCarer.carerName}`;
      let start = appointmentDate;
      let end = addHours(start, 1);
      const appointment = {
        patientId,
        carerId,
        status,
        appointmentDate,
        start,
        end,
        title,
      };
      addHours(appointmentDate, 2);
      return appointment;
    });

    //result will be an array of objects to be used as appointmentInput
    setSimulatedAppointments(draftData);
  };

  //creates appointments with a useMutation and a loop over the array of draft appointments
  const assignAppointments = () => {
    console.log("creating and assigning appointments in db...");
    //useMutation
    createAppointments({
      variables: {
        appointments: simulatedAppointments,
      },
    });
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
          options={formatForSelect(carersArray)}
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
          patientsArray={formatForSelect(patientsArray)}
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
