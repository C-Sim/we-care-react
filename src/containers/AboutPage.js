// overview of how the service works

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { PageTitle } from "../components/atoms/PageTitle";
import { ProfileAvatar } from "../components/atoms/Avatar";
import { ButtonBright } from "../components/atoms/ButtonBright";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { ButtonDisabled } from "../components/atoms/ButtonDisabled";
import { Input } from "../components/atoms/Input";
import { InputDisabled } from "../components/atoms/InputDisabled";

import { Error } from "../components/atoms/Error";

import { NotificationBadge } from "../components/molecules/NotificationBadge";
import { PatientTimeline } from "../components/molecules/PatientTimeline";
import { CarerTimeline } from "../components/molecules/CarerTimeline";
import { ReviewEditable } from "../components/molecules/ReviewEditable";
import { ReviewFixed } from "../components/molecules/ReviewFixed";
import { Dropdown } from "../components/molecules/Dropdown";
import { CalendarSmall } from "../components/molecules/CalendarSmall";

import { HowItWorks } from "../components/molecules/HowItWorks";

import { DraggableDialog } from "../components/molecules/Modal";

export const AboutPage = () => {
  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <PageTitle title="Atoms" />

      <ProfileAvatar
        imageAlt="Alice Smith"
        image="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <ButtonDark label="Button Dark" type="submit" />
      <ButtonBright label="Button Bright" type="submit" />
      <ButtonDisabled label="Button Disabled" type="submit" />
      <Input
        label="Input"
        value=""
        helperText="Please enter a valid something"
      />
      <InputDisabled label="Gender" value="Male" />

      <Error message="Failed. Please try again." />

      <PageTitle title="Molecules" />

      {/* Don't include box as standard - this is just for background colour here */}
      <Box sx={{ backgroundColor: "#3f3d56" }}>
        <NotificationBadge notificationCount={8} />
      </Box>

      <ReviewEditable value={0} />
      <ReviewFixed value={4.5} />

      <Dropdown
        label="Preferred Carer Gender"
        helperText=""
        defaultSelection="none"
        options={[
          {
            value: "none",
            label: "None",
          },
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
        ]}
      />

      <PatientTimeline
        visits={[
          {
            date: "Monday 8th August",
            time: "08:00",
            carerName: "Alice Bond",
            carerGender: "female",
          },
          {
            date: "Thursday 11th August",
            time: "08:00",
            carerName: "Alan Bates",
            carerGender: "male",
          },
        ]}
      />

      <Divider />

      <CarerTimeline
        date="Monday 8th August"
        patients={[
          {
            time: "08:00",
            timeFrame: "past",
            patientName: "Charlie Dean",
            patientGender: "male",
            patientAddress: "Dale Rd B29 6AG",
          },
          {
            time: "10:00",
            timeFrame: "current",
            patientName: "Carol Davies",
            patientGender: "female",
            patientAddress: "Paganel Rd B29 5TG",
          },
          {
            time: "14:00",
            timeFrame: "future",
            patientName: "Abe Zephaniah",
            patientGender: "male",
            patientAddress: "Ambassador Ave B31 2GZ",
          },
        ]}
      />

      <HowItWorks />

      <CalendarSmall />

      <DraggableDialog />
    </Stack>
  );
};
