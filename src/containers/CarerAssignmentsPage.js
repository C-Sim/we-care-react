// For carers to see their assignments by date

import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import Box from "@mui/material/Box";
import { CalendarSmall } from "../components/molecules/CalendarSmall";
import { PageTitle } from "../components/atoms/PageTitle";

import { AppContext } from "../context/AppProvider";
import { RECEIVED_NOTIFICATIONS } from "../graphql/queries";

export const CarerAssignmentsPage = () => {
  const context = useContext(AppContext);
  //   const userId = context.user.id;

  const mailType = "received";

  //   const { data, loading } = useQuery(, {
  //     variables: {  },
  //   });

  return (
    <Box>
      <PageTitle title="Assignments By Date" />
      <CalendarSmall />
    </Box>
  );
};
