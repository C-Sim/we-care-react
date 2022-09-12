// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import React from "react";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
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
  //state variables needed for overall page
  const [dateValue, setDateValue] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectedDate, setSelectedDate] = useState();
  const [dateLock, setDateLock] = useState(false);
  const [carersArray, setCarersArray] = useState([]);
  const [carerId, setCarerId] = useState();
  const [carerValue, setCarerValue] = useState();
  const [carerLock, setCarerLock] = useState(false);
  const [selectedCarer, setSelectedCarer] = useState();
  const [patientsArray, setPatientsArray] = useState([]);
  const [patient, setPatientId] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [patientLock, setPatientLock] = useState(false);
  const [patientList, setPatientList] = useState();
  const [simulatedAppointments, setSimulatedAppointments] = useState();
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

  //useEffects hooks to monitors changes
  useEffect(() => {
    if (dateLock && dateValue) {
      setSelectedDate(format(new Date(dateValue), "yyyy-MM-dd"));
    }
  }, [dateLock, dateValue]);
  useEffect(() => {
    if (carerData && carerData.availableCarersByDate && !carerLoading) {
      setCarersArray(carerData.availableCarersByDate);
    }
  }, [carerData, carerLoading]);
  useEffect(() => {
    if (carerId) {
      const correspondingName = carersArray.filter(
        (i) => i.userId === carerId
      )[0].username;
      setCarerValue(correspondingName);
    }
  }, [carerId]);
  useEffect(() => {
    if (
      patientData &&
      patientData.availablePatientsByCarerGenderAndDay &&
      !patientLoading
    ) {
      setPatientsArray(patientData.availablePatientsByCarerGenderAndDay);
    }
  }, [patientData, patientLoading]);
  //success state changes on create success
  const [assignSuccess, setAssignSuccess] = useState(false);

  //date picker - retrieving the selected date in a variable

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  //then locking the date and triggering retrieval of the available carers
  const saveSelectedDate = () => {
    setDateLock(true);
    setSelectedDate(format(new Date(dateValue), "yyyy-MM-dd"));
    console.log(selectedDate);
    getAvailableCarers({
      variables: {
        selectedDate: dateValue,
      },
    });
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
  const handleCarerSelect = (event) => {
    setCarerId(event.target.value);
  };

  console.log("carerId :", carerId);
  console.log("carerValue :", carerValue);
  console.log("selected carer:", selectedCarer);
  //then locking the carer and retrieving the corresponding available patients
  const saveSelectedCarer = () => {
    setCarerLock(true);

    const fullCarer = {
      carerId,
      carerName: carerValue,
    };
    setSelectedCarer(fullCarer);
    getAvailablePatients({
      variables: {
        userId: carerId,
        selectedDate,
      },
    });
  };

  //patients check boxes - retrieving the selected patients' id in a variable
  const handlePatientSelect = (e) => {
    let data = patient.indexOf(e.target.value);
    if (data === -1) {
      setPatientId([...patient, e.target.value]);
      const correspondingName = patientsArray.filter(
        (i) => i.userId === e.target.value
      )[0].username;
      setSelectedPatients([...selectedPatients, correspondingName]);
    } else {
      setPatientId(patient.filter((data) => data !== e.target.value));
      const correspondingName = patientsArray.filter(
        (i) => i.userId === e.target.value
      )[0].username;
      setSelectedPatients(
        selectedPatients.filter((data) => data !== correspondingName)
      );
    }
  };

  console.log("patient id list: ", patient);
  console.log("patient names:", selectedPatients);

  //then locking the patients for the next step of the assigning process
  const saveSelectedPatients = () => {
    setPatientLock(true);
    const fullPatient = patient.map(
      (i) => patientsArray.filter((p) => p.userId === i)[0]
    );
    setPatientList(fullPatient);
  };

  console.log("patients list:", patientList);
  //run simulation with selected data (dateValue, carerId, patient)

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
          defaultSelection=""
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
        {selectedCarer && <h1>Selected carer: {selectedCarer.carerName}</h1>}
      </div>
      <div>
        <h1>A div for patients selection</h1>
        <CheckList
          array={formatForSelect(patientsArray)}
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
