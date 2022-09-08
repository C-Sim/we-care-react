import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

import Box from "@mui/material/Box";

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { Input } from "../atoms/Input";

export const CarePlan = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      <h2>Do you have any disabilities?</h2>
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />

      <Input></Input>
      <h2>How would you best describe your current mobility?</h2>
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>

      <h2>How would you best describe your current ability to communicate?</h2>
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>

      <h2>
        How would you best describe your current ability to maintain your
        personal care?
      </h2>
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>

      <h2>How would you best describe your current mental health?</h2>
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>

      <h2>Do you have any dietary requirements?</h2>
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="start"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>
    </Box>
  );
};
