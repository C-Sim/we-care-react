// for Supervisors to view notifications
import { Dropdown } from "../components/molecules/Dropdown";
import Box from "@mui/material/Box";
import { NotificationsTable } from "../components/organisms/NotificationsTable";
import { PageTitle } from "../components/atoms/PageTitle";

export const SupervisorNotificationsPage = () => {
  // const mailType = "received";

  //   const { data, loading } = useQuery(RECEIVED_NOTIFICATIONS, <TODO: insertvars>);

  //   if (loading) {
  //     return <h2>LOADING...</h2>;
  //   }

  return (
    <Box>
      <PageTitle title="Notifications" />

      {/* call loading here using ifloading */}
      {/* handle error if doesn't load */}

      <NotificationsTable />
    </Box>
  );
};
