// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import React from "react";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { format, addHours, parseISO } from "date-fns";
import { Dropdown } from "../components/molecules/Dropdown";
import { CheckList } from "../components/molecules/CheckList";
import { CarerTimeline } from "../components/molecules/CarerTimeline";
import { DatePicker } from "../components/atoms/DatePicker";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { Alert, Paper, Typography, useMediaQuery, Box } from "@mui/material";
import { ButtonDisabled } from "../components/atoms/ButtonDisabled";
import { AVAILABLE_CARERS } from "../graphql/queries";
import { AVAILABLE_PATIENTS } from "../graphql/queries";
import { CREATE_APPOINTMENTS } from "../graphql/mutations";
import { DraftTimeline } from "../components/molecules/DraftTimeline";

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
  const isMobile = useMediaQuery("(max-width:900px)");
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

  //then locking the patients for the next step of the assigning process
  const saveSelectedPatients = () => {
    setPatientLock(true);
    const fullPatient = patient.map(
      (i) => patientsArray.filter((p) => p.userId === i)[0]
    );
    setPatientList(fullPatient);
  };

  //run simulation with selected data (dateValue, carerId, patient)
  //this version does not have distance matrix api info for distance between calls
  const runSimulation = () => {
    //set the info common to all appointments
    const carerId = selectedCarer.carerId;
    const status = "upcoming";

    const draftData = [];
    //loop over patients list
    for (let i = 0; i < patientList.length; i += 1) {
      const patient = patientList[i];
      const patientId = patient.userId;
      const title = `Visit to ${patient.username} by ${selectedCarer.carerName}`;
      const hour = 8 + i * 2;
      const appointmentDate = new Date(selectedDate).setUTCHours(hour, 0, 0);
      const start = appointmentDate;
      const end = addHours(start, 1);
      const appointment = {
        patientId,
        carerId,
        status,
        appointmentDate: format(appointmentDate, "yyyy-MM-dd'T'HH:mm:ss"),
        start: format(start, "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(end, "yyyy-MM-dd'T'HH:mm:ss"),
        title,
      };
      draftData.push(appointment);
    }

    //result will be an array of objects to be used as appointmentInput
    setSimulatedAppointments(draftData);
  };

  //creates appointments with a useMutation and a loop over the array of draft appointments
  const assignAppointments = () => {
    console.log("creating and assigning appointments in db...");
    //useMutation
    debugger;
    console.log(simulatedAppointments);
    createAppointments({
      variables: {
        appointments: simulatedAppointments,
      },
    });
  };

  console.log(assignSuccess);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(97, 218, 251, 0.2)",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{ p: 3, minWidth: isMobile ? "90%" : "400px" }}
      >
        Assignment page
      </Typography>
      <Paper
        variant="outlined"
        sx={{ p: 3, mt: 2, minWidth: isMobile ? "90%" : "400px" }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Step 1 - Pick the date to assign appointments on
        </Typography>
        {!dateLock && <DatePicker handleDateChange={handleDateChange} />}
        {!dateLock && (
          <ButtonDark
            label="Use this date"
            type="button"
            onClick={saveSelectedDate}
          />
        )}
        {dateLock && <ButtonDisabled label="Date saved" type="button" />}
        {dateLock && (
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            Selected date: {selectedDate}
          </Typography>
        )}
      </Paper>
      <Paper
        variant="outlined"
        sx={{ p: 3, mt: 1, minWidth: isMobile ? "90%" : "400px" }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Step 2 - Pick a carer available on that date from the list
        </Typography>

        {dateLock && !carerLock && (
          <>
            <Dropdown
              label="Select Carer"
              helperText=""
              defaultSelection=""
              options={formatForSelect(carersArray)}
              handleSelect={handleCarerSelect}
            />
            <ButtonDark
              label="Use this carer"
              type="button"
              onClick={saveSelectedCarer}
            />
          </>
        )}

        {carerLock && <ButtonDisabled label="Carer saved" type="button" />}
        {selectedCarer && (
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            Selected carer: {selectedCarer.carerName}
          </Typography>
        )}
      </Paper>
      <Paper
        variant="outlined"
        sx={{ p: 3, mt: 1, minWidth: isMobile ? "90%" : "400px" }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Step 3 - Pick the patients you would like to assign to that carer
        </Typography>
        {carerLock && !patientLock && (
          <>
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
          </>
        )}
        {patientLock && <ButtonDisabled label="Patients saved" type="button" />}
        {patientLock && (
          <div>
            <Typography component="h1" variant="h5" align="left" sx={{ mb: 2 }}>
              Selected patients:
            </Typography>
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
      </Paper>
      <Paper
        variant="outlined"
        sx={{ p: 3, mt: 1, minWidth: isMobile ? "90%" : "400px" }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Step 4 - View the appointments based on your selections
        </Typography>
        {patientLock && !simulatedAppointments && (
          <ButtonDark
            label="Build timeline"
            type="button"
            onClick={runSimulation}
            sx={{ m: 4 }}
          />
        )}
        {simulatedAppointments && (
          <DraftTimeline
            date={selectedDate}
            appointments={simulatedAppointments}
          />
        )}
      </Paper>
      {simulatedAppointments && (
        <Paper
          variant="outlined"
          sx={{ p: 3, mt: 1, minWidth: isMobile ? "90%" : "400px" }}
        >
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            If you're satisfied with this selection, click the button below to
            assign the appointments
          </Typography>
          <ButtonDark
            label="Save Appointments"
            type="button"
            onClick={assignAppointments}
          />
        </Paper>
      )}
      <div>
        {assignSuccess && (
          <Alert severity="success">
            The appointments have been created successfully!
          </Alert>
        )}
        {createError && (
          <Alert severity="warning">
            The system failed to assign appointments. Please try again or
            contact your administrator.
          </Alert>
        )}
      </div>
      <div>
        <h1>
          Some text to have some space so the button is not covered by the
          footer
        </h1>
        <h1>
          Some text to have some space so the button is not covered by the
          footer
        </h1>
        <h1>
          Some text to have some space so the button is not covered by the
          footer
        </h1>
        <h1>
          Some text to have some space so the button is not covered by the
          footer
        </h1>
      </div>
    </Box>
  );
};
