import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { Input } from "../atoms/Input";

import { Login } from "../../graphql/mutations";
import { ADDRESS_LOOKUP } from "../../graphql/queries";
import { ButtonDark } from "../atoms/ButtonDark";

export const CarePlan = ({ isMobile }) => {
  const [Login, { data, loading, error }] = useMutation(Login);

  const [checked, setCheckBoxChecked] = useState(false);

  const selectOption = (value) => {
    console.log(value);
    if (value === "yes") {
      setCheckBoxChecked((checked) => !checked);
    }
    if (value === "no") {
      setCheckBoxChecked((checked) => !checked);
    }

    const options = [
      { label: "Yes", value: "start" },
      { label: "No", value: "start" },
    ];
  };

  return (
    <Box>
      <h2>Do you have any disabilities?</h2>
      <FormControlLabel
        value="disabilities"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="disabilities"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />

      <Input></Input>
      <h2>How would you best describe your current mobility?</h2>
      <FormControlLabel
        value="mobility"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="mobility"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>

      <h2>How would you best describe your current ability to communicate?</h2>
      <FormControlLabel
        value="communicate"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="communicate"
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
        value="personal care"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="personal care"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>

      <h2>How would you best describe your current personal care?</h2>
      <FormControlLabel
        value="personal care"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="personal care"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>

      <h2>Do you have any dietary requirements?</h2>
      <FormControlLabel
        value="dietary requirements"
        control={<Checkbox />}
        label="Yes"
        labelPlacement="start"
      />
      <FormControlLabel
        value="dietary requirements"
        control={<Checkbox />}
        label="No"
        labelPlacement="start"
      />
      <Input></Input>
    </Box>
  );
};
