// for Supervisors to view notifications
import { Dropdown } from "../components/molecules/Dropdown";
import Box from "@mui/material/Box";
import { NotificationsTable } from "../components/organisms/NotificationsTable";
import { PageTitle } from "../components/atoms/PageTitle";

export const SupervisorNotificationsPage = () => {
  return (
    <Box>
      <PageTitle title="Notifications" />

      {/* <Dropdown
        label="Sort"
        helperText=""
        defaultSelection=""
        required=""
        options={[
          {
            value: "submitted",
            label: "Submitted",
          },
          {
            value: "visitDate",
            label: "Visit Date",
          },
          {
            value: "visitTime",
            label: "Visit Time",
          },
        ]}
      />

      <Dropdown
        label="Filter"
        helperText=""
        defaultSelection=""
        required=""
        options={[
          {
            value: "type",
            label: "Type",
          },
          {
            value: "carer",
            label: "Carer",
          },
          {
            value: "patient",
            label: "Patient",
          },
        ]}
      /> */}

      <NotificationsTable />
    </Box>
  );
};
