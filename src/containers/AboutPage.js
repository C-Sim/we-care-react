// overview of how the service works
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { ImageUploader } from "../components/molecules/ImageUploader";

import logo from "../components/atoms/images/WeCare-dark.png";
import { ModalForCarer } from "../components/molecules/ModalForCarer";
import { ModalForSupervisor } from "../components/molecules/ModalForSupervisor";

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <Box
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "18px",
        }}
      >
        <PageTitle title="Welcome to" />
        <img alt="logo" src={logo} width="300px" height="80px" />
      </Box>
      <Stack spacing={2} p={2} pl={18} pr={18}>
        <Typography fontSize="0.8rem" fontWeight={100} align="center">
          WeCare was created for everyone involved in the provision of care
          services, including care users and our wide network of cares across
          the city of Birmingham.{" "}
        </Typography>

        <Typography fontSize="0.8rem" fontWeight={100} align="center">
          Our aim is to give all users access to all of the care information
          relevant to them in a single place on a digital platform so that they
          can move away from paper-based systems, make in-moment changes and see
          live updates.{" "}
        </Typography>
      </Stack>
      <HowItWorks />
      <Box align="center" m={4} p={4}>
        <ReviewFixed align="center" value="4.5" />

        <Typography fontSize="0.8rem" fontWeight={100}>
          Read our reviews to see what our users have to say about us
        </Typography>
      </Box>
      <Box align="center" pb={4}>
        <ButtonDark
          label="Get Started"
          type="button"
          onClick={() => {
            navigate("/sign-up", { replace: true });
          }}
        />
      </Box>
    </Stack>
  );
};
