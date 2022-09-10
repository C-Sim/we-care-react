import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { Input } from "../atoms/Input";
import InputDisabled from "../atoms/InputDisabled";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
//import { createCarePlan } from "../../graphql/mutations";

export const CarePlanForm = ({ isMobile }) => {
  //care plan check boxes
  const [AddInput, getInputBox] = useState([]);

  const handleOptions = (e) => {
    let data = AddInput.indexOf(e.target.value);
    if (data === -1) {
      getInputBox([...AddInput, e.target.value]);
    } else {
      getInputBox(AddInput.filter((data) => data !== e.target.value));
      console.log(data);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel component="legend">Do you have any disabilities?</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>How would you best describe your current mobility?</h2>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>How would you best describe your current ability to communicate?</h2>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>
        How would you best describe your current ability to maintain your
        personal care?
      </h2>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>How would you best describe your current mental health?</h2>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>Do you have any dietary requirements?</h2>

      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
