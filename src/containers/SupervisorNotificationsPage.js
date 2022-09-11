// for Supervisors to view notifications
import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { NotificationsTable } from "../components/organisms/NotificationsTable";
import { PageTitle } from "../components/atoms/PageTitle";

import { AppContext } from "../context/AppProvider";
import { RECEIVED_NOTIFICATIONS } from "../graphql/queries";

export const SupervisorNotificationsPage = () => {
  const context = useContext(AppContext);
  const userId = "631dea0b4628b8e84097223c";
  // context.user.id;

  const mailType = "received";

  const { data, loading } = useQuery(RECEIVED_NOTIFICATIONS, {
    variables: { mailType, userId },
  });

  return (
    <Box>
      <PageTitle title="Notifications" />
      {/* call loading here using ifloading */}
      {/* {loading && <LoadingButton loading variant="outlined" />}; */}
      {/* handle error if doesn't load */}
      <NotificationsTable notifications={data} />
    </Box>
  );
};
