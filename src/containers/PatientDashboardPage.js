import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { PatientTimeline } from "../components/molecules/PatientTimeline";
import { NextVisitPatient } from "../components/organisms/NextVisitPatient";

import { NEXT_WEEK_APPOINTMENTS } from "../graphql/queries";

export const PatientDashboardPage = () => {
  const { data, loading, error } = useQuery(NEXT_WEEK_APPOINTMENTS, {
    fetchPolicy: "network-only",
  });
  const [timelineData, setTimelineData] = useState([]);
  const [appointmentDetail, setAppointmentDetail] = useState();

  useEffect(() => {
    if (data) {
      setTimelineData(data.appointmentsForNextWeek);
    }
  }, [data]);

  const viewAppointment = (event) => {
    const appointment = timelineData.filter((i) => i.id === event.target.id)[0];
    setAppointmentDetail(appointment);
  };

  return (
    <>
      <h1 align="center">
        Welcome, {appointmentDetail && appointmentDetail.patientId.firstName}{" "}
        {appointmentDetail && appointmentDetail.patientId.lastName}
      </h1>
      <PatientTimeline
        appointments={timelineData}
        viewAppointment={viewAppointment}
      />
      {appointmentDetail && (
        <NextVisitPatient appointmentDetail={appointmentDetail} />
      )}
    </>
  );
};
