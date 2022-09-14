import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { PatientTimeline } from "../components/molecules/PatientTimeline";
import { NextVisitPatient } from "../components/organisms/NextVisitPatient";
import { APPOINTMENTS_BY_ID } from "../graphql/queries";
import { NEXT_WORKING_DAY_APPOINTMENTS } from "../graphql/queries";

export const PatientDashboardPage = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS_BY_ID, {
    fetchPolicy: "network-only",
  });
  const [timelineData, setTimelineData] = useState([]);
  const [appointmentDetail, setAppointmentDetail] = useState();

  useEffect(() => {
    if (data) {
      setTimelineData(data.appointmentsByUserId);
    }
  }, [data]);
  console.log(timelineData);

  const viewAppointment = (event) => {
    console.log(event.target);
    const appointment = timelineData.filter((i) => i.id === event.target.id)[0];
    setAppointmentDetail(appointment);
    console.log(appointment);
  };

  return (
    <>
      <h1 align="center">Welcome, UserName</h1>
      <PatientTimeline
        visits={timelineData}
        viewAppointment={viewAppointment}
      />
      {appointmentDetail && <NextVisitPatient />}
    </>
  );
};
