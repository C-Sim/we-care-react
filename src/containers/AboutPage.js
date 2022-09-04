// overview of how the service works

import Stack from "@mui/material/Stack";

import { ProfileAvatar } from "../components/atoms/Avatar";
import { ButtonBright } from "../components/atoms/ButtonBright";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { ButtonDisabled } from "../components/atoms/ButtonDisabled";
import { Input } from "../components/atoms/Input";
import { Footer } from "../components/molecules/Footer";

import { Error } from "../components/atoms/Error";

export const AboutPage = () => {
  return (
    <Stack spacing={2} sx={{ m: 4 }}>
      <ProfileAvatar
        imageAlt="Alice Smith"
        image="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <ButtonDark label="Button Dark" type="submit" />
      <ButtonBright label="Button Bright" type="submit" />
      <ButtonDisabled label="Button Disabled" type="submit" />
      <Input label="Input" helperText="Please enter a valid something" />
      <Error message="Failed. Please try again." />
      <Footer />
    </Stack>
  );
};
