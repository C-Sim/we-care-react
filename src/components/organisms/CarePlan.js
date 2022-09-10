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
  // handle disability option
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

  // handle mobility option
  const [mobilityOption, setMobilityOption] = useState("no");
  const [mobilityProblems, setMobilityProblems] = useState("none");
  const handleMobilityOptionChange = (event) => {
    setMobilityOption(event.target.value);
    if (event.target.value === "no") {
      setMobilityProblems("none");
    }
  };
  const handleMobilityChange = (event) => {
    if (mobilityOption === "yes") {
      setMobilityProblems(event.target.value);
    }
  };

  // handle communication option
  const [communicationOption, setCommunicationOption] = useState("no");
  const [communicationProblems, setCommunicationProblems] = useState("none");
  const handleCommunicationOptionChange = (event) => {
    setCommunicationOption(event.target.value);
    if (event.target.value === "no") {
      setCommunicationProblems("none");
    }
  };
  const handleCommunicationChange = (event) => {
    if (mobilityOption === "yes") {
      setCommunicationProblems(event.target.value);
    }
  };

  // handle personal care option
  const [personalCareOption, setPersonalCareOption] = useState("no");
  const [personalCareProblems, setPersonalCareProblems] = useState("none");
  const handlePersonalCareOptionChange = (event) => {
    setPersonalCareOption(event.target.value);
    if (event.target.value === "no") {
      setPersonalCareProblems("none");
    }
  };
  const handlePersonalCareChange = (event) => {
    if (mobilityOption === "yes") {
      setPersonalCareProblems(event.target.value);
    }
  };

  // handle mental health option
  const [mentalHealthOption, setMentalHealthOption] = useState("no");
  const [mentalHealthProblems, setMentalHealthProblems] = useState("none");
  const handleMentalHealthOptionChange = (event) => {
    setMentalHealthOption(event.target.value);
    if (event.target.value === "no") {
      setMentalHealthProblems("none");
    }
  };
  const handleMentalHealthChange = (event) => {
    if (mentalHealthOption === "yes") {
      setMentalHealthProblems(event.target.value);
    }
  };

  // handle dietary Requirements option
  const [dietaryRequirementsOption, setDietaryRequirementsOption] =
    useState("no");
  const [dietaryRequirementsProblems, setDietaryRequirementsProblems] =
    useState("none");
  const handleDietaryRequirementsOptionChange = (event) => {
    setDietaryRequirementsOption(event.target.value);
    if (event.target.value === "no") {
      setDietaryRequirementsProblems("none");
    }
  };
  const handleDietaryRequirementsChange = (event) => {
    if (dietaryRequirementsOption === "yes") {
      setDietaryRequirementsProblems(event.target.value);
    }
  };

  // handle allergies option
  const [allergiesOption, setAllergiesOption] = useState("no");
  const [allergiesProblems, setAllergiesProblems] = useState("none");
  const handleAllergiesOptionChange = (event) => {
    setAllergiesOption(event.target.value);
    if (event.target.value === "no") {
      setAllergiesProblems("none");
    }
  };
  const handleAllergiesChange = (event) => {
    if (allergiesOption === "yes") {
      setAllergiesProblems(event.target.value);
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

      <h2>Do you currently have any mobility issues?</h2>
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
            onChange={handleMobilityOptionChange}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleMobilityOptionChange}
          />
        </RadioGroup>
        {mobilityOption === "yes" && (
          <TextField onChange={handleMobilityChange} />
        )}
      </FormControl>

      <h2>Do you currently have any communication problems?</h2>
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
            onChange={handleCommunicationOptionChange}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleCommunicationOptionChange}
          />
        </RadioGroup>
        {communicationOption === "yes" && (
          <TextField onChange={handleCommunicationChange} />
        )}
      </FormControl>

      <h2>Do you have any Personal Care issues?</h2>
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
            onChange={handlePersonalCareOptionChange}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handlePersonalCareOptionChange}
          />
        </RadioGroup>
        {personalCareOption === "yes" && (
          <TextField onChange={handlePersonalCareChange} />
        )}
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
            onChange={handleMentalHealthOptionChange}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleMentalHealthOptionChange}
          />
        </RadioGroup>
        {mentalHealthOption === "yes" && (
          <TextField onChange={handleMentalHealthChange} />
        )}
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
            onChange={handleDietaryRequirementsOptionChange}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleDietaryRequirementsOptionChange}
          />
        </RadioGroup>
        {dietaryRequirementsOption === "yes" && (
          <TextField onChange={handleDietaryRequirementsChange} />
        )}
      </FormControl>

      <h2>Do you have any allergies?</h2>

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
            onChange={handleAllergiesOptionChange}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onChange={handleAllergiesOptionChange}
          />
        </RadioGroup>
        {allergiesOption === "yes" && (
          <TextField onChange={handleAllergiesChange} />
        )}
      </FormControl>
    </Box>
  );
};
