import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { PatientTimeline } from "../components/molecules/PatientTimeline";
import { NextVisitPatient } from "../components/organisms/NextVisitPatient";
import { APPOINTMENTS_BY_ID } from "../graphql/queries";
import { NEXT_WORKING_DAY_APPOINTMENTS } from "../graphql/queries";

export const PatientDashboardPage = () => {
  const { data, loading } = useQuery(NEXT_WORKING_DAY_APPOINTMENTS);
  const [timelineData, setTimelineData] = useState([]);
  useEffect(() => {
    if (data) {
      setTimelineData(data.appointmentsForNextWorkingDay);
    }
  }, [data]);
  console.log(timelineData);

  return (
    <>
      <h1 align="center">Welcome, UserName</h1>
      <PatientTimeline
        visits={[
          {
            id: "1234",
            date: "Monday 8th August",
            time: "08:00",
            carerName: "Alice Bond",
            carerGender: "female",
          },
          {
            id: "12345",
            date: "Thursday 11th August",
            time: "08:00",
            carerName: "Alan Bates",
            carerGender: "male",
          },
        ]}
      />
      <NextVisitPatient />
    </>
  );
};
