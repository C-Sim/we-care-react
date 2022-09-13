// For carers to see their assignments by date

import { useContext, useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import Box from "@mui/material/Box";
import { CalendarSmall } from "../components/molecules/CalendarSmall";
import { PageTitle } from "../components/atoms/PageTitle";
import { CarerTimeline } from "../components/molecules/CarerTimeline";
import { ButtonBright } from "../components/atoms/ButtonBright";
import { AppContext } from "../context/AppProvider";
import { APPOINTMENTS_BY_ID } from "../graphql/queries";

import "react-calendar/dist/Calendar.css";
import { Typography } from "@mui/material";
import { Data } from "@react-google-maps/api";

export const CarerCalendarPage = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS_BY_ID, {
    fetchPolicy: "network-only",
  });

  const [userResults, setUserResults] = useState();

  useEffect(() => {
    if (data && data.appointmentsByUserId) {
      setUserResults(data.appointmentsByUserId);
    }
  }, [data]);

  // const userResults = [
  //   {
  //     appointmentDate: "2022-09-01",
  //     start: "2022-09-01",
  //   },
  //   { appointmentDate: "2022-09-01", start: "2022-09-01" },
  // ];
  return (
    <Box>
      <PageTitle title="Assignments By Date" />
      {userResults && <CalendarSmall userResults={userResults} />}
    </Box>
  );
};
