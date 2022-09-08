import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

import Box from "@mui/material/Box";

import { Input } from "../atoms/Input";

export const CarePlan = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      <h2>Do you have any disabilities?</h2>><Input></Input>
      <h2>How would you best describe your current mobility?</h2>
      <Input></Input>
      <h2>How would you best describe your current ability to communicate?</h2>
      <Input></Input>
      <h2>
        How would you best describe your current ability to maintain your
        personal care?
      </h2>
      <Input></Input>
      <h2>How would you best describe your current mental health?</h2>
      <Input></Input>
      <h2>Do you have any dietary requirements?</h2>
      <Input></Input>
      {/* check boxes */}
    </Box>
  );
};
