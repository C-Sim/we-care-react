// overview of how the service works

import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ProfileAvatar } from "../components/atoms/Avatar";
import { ButtonBright } from "../components/atoms/ButtonBright";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { ButtonDisabled } from "../components/atoms/ButtonDisabled";
import { Input } from "../components/atoms/Input";
import { Error } from "../components/atoms/Error";

import { NotificationBadge } from "../components/molecules/NotificationBadge";

export const AboutPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <Typography align="center">Atoms</Typography>

      <ProfileAvatar
        imageAlt="Alice Smith"
        image="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <ButtonDark label="Button Dark" type="submit" />
      <ButtonBright label="Button Bright" type="submit" />
      <ButtonDisabled label="Button Disabled" type="submit" />
      <Input label="Input" helperText="Please enter a valid something" />
      <Error message="Failed. Please try again." />

      <Typography align="center">Molecules</Typography>

      {/* Don't include box as standard - this is just for background colour here */}
      <Box sx={{ backgroundColor: "#3f3d56" }}>
        <NotificationBadge notificationCount={8} />
      </Box>
    </Stack>
  );
};
