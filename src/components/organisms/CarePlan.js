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
import TextField from "@mui/material/TextField";
//import { createCarePlan } from "../../graphql/mutations";

export const CarePlanForm = ({ isMobile }) => {
  //care plan check boxes
  const [AddInput, setInputId] = useState([]);
  const [disabilityOption, setDisabilityOption] = useState("no");
  const [disabilities, setDisabilities] = useState("none");
  const handleDisabilityOptionChange = (event) => {
    setDisabilityOption(event.target.value);
    if (event.target.value === "no") {
      setDisabilities("none");
    }
  };
  const handleDisabilitiesChange = (event) => {
    if (disabilityOption === "yes") {
      setDisabilities(event.target.value);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel component="legend">Do you have any disabilities?</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="disabilities"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onChange={handleDisabilityOptionChange}
          />

          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleDisabilityOptionChange}
          />
        </RadioGroup>

        {disabilityOption === "yes" && (
          <TextField onChange={handleDisabilitiesChange} />
        )}
      </FormControl>

      <h2>How would you best describe your current mobility?</h2>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="current_mobility"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            //onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            //onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>How would you best describe your current ability to communicate?</h2>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="current_communication_level"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            //onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            //onChange={handleOptions}
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
          name="current_personal_care"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            //onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            //onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>How would you best describe your current mental health?</h2>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="current_mental_health"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            //onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            //onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>

      <h2>Do you have any dietary requirements?</h2>

      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="current_dietary_requirements"
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            //onChange={handleOptions}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            //onChange={handleOptions}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
