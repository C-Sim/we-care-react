import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import calendar from "../components/atoms/images/calendar.png";
import { PatientTimeline } from "../components/molecules/PatientTimeline";
import { NextVisitPatient } from "../components/organisms/NextVisitPatient";

import { NEXT_WEEK_APPOINTMENTS } from "../graphql/queries";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const PatientDashboardPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
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
    <Box
      sx={{
        p: 0,
        width: "100%",
        height: "85%",
      }}
    >
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
      {!appointmentDetail && !isMobile && (
        <Box
          sx={{
            position: "absolute",
            right: 10,
            top: 150,
            marginTop: "-2%",
            marginLeft: "6%",
            zIndex: 20,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <img src={calendar} height="500vh" />
        </Box>
      )}
    </Box>
  );
};
