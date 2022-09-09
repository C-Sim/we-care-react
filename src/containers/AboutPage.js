// overview of how the service works

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

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

import logo from "../components/atoms/images/WeCare-dark.png";
import { ModalForCarer } from "../components/molecules/ModalForCarer";
import { ModalForSupervisor } from "../components/molecules/modalForSupervisor";

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

      <ModalForCarer />
      <ModalForSupervisor />

      <CalendarSmall />

      <Box
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
        }}
      >
        <PageTitle title="Welcome to" />
        <img alt="logo" src={logo} width="300px" height="80px" />
      </Box>

      <Stack spacing={2} p={2} pl={18} pr={18}>
        <Typography fontSize="0.8rem" fontWeight={100} align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum,
          est vel egestas condimentum, enim magna dictum nisi, nec condimentum
          dolor lacus eget metus.{" "}
        </Typography>

        <Typography fontSize="0.8rem" fontWeight={100} align="center">
          Vivamus quis hendrerit risus, eu tempus leo. Ut commodo, enim ut
          congue sodales, risus arcu lobortis dolor, ultricies elementum orci
          ante in quam. Nam egestas sem quis urna congue congue. Morbi vel ipsum
          neque.{" "}
        </Typography>
      </Stack>

      <HowItWorks />

      <Box align="center" m={4} p={4}>
        <ReviewFixed align="center" value="4.5" />

        <Typography fontSize="0.8rem" fontWeight={100}>
          Read our reviews to see what our users have to say about us
        </Typography>
      </Box>
    </Stack>
  );
};
