import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { PatientTimeline } from "../components/molecules/PatientTimeline";
import { NextVisitPatient } from "../components/organisms/NextVisitPatient";

import { NEXT_WEEK_APPOINTMENTS } from "../graphql/queries";

import Typography from "@mui/material/Typography";

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
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          paddingTop: 4,
          color: "#3f3d56",
          fontWeight: 100,
          fontSize: 32,
        }}
      >
        Welcome {appointmentDetail && appointmentDetail.patientId.firstName}{" "}
        {appointmentDetail && appointmentDetail.patientId.lastName}
      </Typography>

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
