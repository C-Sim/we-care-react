// overview of how the service works

import Stack from "@mui/material/Stack";

import { ButtonBright } from "../components/atoms/ButtonBright";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { ButtonDisabled } from "../components/atoms/ButtonDisabled";
import { Error } from "../components/atoms/Error";

export const AboutPage = () => {
  return (
    <Stack spacing={2}>
      <ButtonBright label="Button Bright" type="submit" />;
      <ButtonDark label="Button Dark" type="submit" />;
      <ButtonDisabled label="Button Disabled" type="submit" />;
      <Error message="Failed. Please try again." />;
    </Stack>
  );
};
