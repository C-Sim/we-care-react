// for Supervisors to view notifications
import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { NotificationsTable } from "../components/organisms/NotificationsTable";
import { PageTitle } from "../components/atoms/PageTitle";
import { Error } from "../components/atoms/Error";

import { AppContext } from "../context/AppProvider";
import { RECEIVED_NOTIFICATIONS } from "../graphql/queries";

export const CarerNotificationsPage = () => {
  const context = useContext(AppContext);

  const { data, loading, error } = useQuery(RECEIVED_NOTIFICATIONS);

  return (
    <Box>
      <PageTitle title="Notifications" />
      {loading && <LoadingButton loading align="center" variant="outlined" />}
      {error && (
        <Error message="Failed to load notifications. Please try again." />
      )}
      {data && (
        <NotificationsTable notifications={data.notificationsByUserId} />
      )}
    </Box>
  );
};
