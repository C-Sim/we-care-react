import * as React from "react";

import { useForm } from "react-hook-form";

import { useMutation, useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState, useContext } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import { ButtonDark } from "../atoms/ButtonDark";

import { CREATE_CARE_PLAN } from "../../graphql/mutations";
import { AppContext } from "../../context/AppProvider";

export const CarePlanForm = ({ isMobile }) => {
  //state for update success
  const [carePlanSuccess, setCarePlanSuccess] = useState(false);
  const [CarePlanMessage, setCarePlanMessage] = useState(false);

  //mutations
  const [createCarePlan, { data, loading, error }] = useMutation(
    CREATE_CARE_PLAN,
    {
      onCompleted: (data) => {
        console.log(data.createCarePlan.user);
        context.setUser(data.createCarePlan.user);
        localStorage.setItem("user", JSON.stringify(data.createCarePlan.user));
        setCarePlanSuccess(true);
      },
    }
  );

  //get context
  const context = useContext(AppContext);
  const userId = context.user.id;

  //form definitions
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  //variables for update
  const [disabilitiesUpdate, setDisabilitiesUpdate] = useState(
    context.user.disabilities
  );
  const [mobilityUpdate, setMobilityUpdate] = useState(context.user.mobility);
  const [communicationUpdate, setCommunicationUpdate] = useState(
    context.user.communication
  );
  const [allergiesUpdate, setAllergiesUpdate] = useState(
    context.user.allergies
  );
  const [personalCareUpdate, setPersonalCareUpdate] = useState(
    context.user.personalCare
  );
  const [mentalHealthUpdate, setMentalHealthUpdate] = useState(
    context.user.mentalHealth
  );
  const [dietaryRequirementsUpdate, setDietaryRequirementsUpdate] = useState(
    context.user.dietaryRequirements
  );

  const handleCreateCarePlan = (formData) => {
    const carePlanInput = {
      disabilities: formData.disabilities,
      mobility: formData.mobility,
      communication: formData.communication,
      allergies: formData.allergies,
      personalCare: formData.personalCare,
      mentalHealth: formData.mentalHealth,
      dietaryRequirements: formData.dietaryRequirements,
    };

    createCarePlan({
      variables: {
        userId,
        carePlanInput,
      },
    });
  };

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
    <Box
    // component="form"
    // sx={{ p: 3 }}
    // spacing={4}
    // onSubmit={handleSubmit(handleCarePlanUpdate)}
    >
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
          <TextField
            sx={{ display: "block" }}
            placeholder="Please best describe your disabilities"
            onChange={handleDisabilitiesChange}
          />
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
          <TextField
            sx={{ display: "block" }}
            placeholder="Please best describe your mobility"
            onChange={handleMobilityChange}
          />
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
          <TextField
            placeholder="Please best describe your communication problems"
            onChange={handleCommunicationChange}
          />
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
          <TextField
            sx={{ display: "block" }}
            placeholder="Please best describe your Personal Care issues"
            onChange={handlePersonalCareChange}
          />
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
          <TextField
            sx={{ display: "block" }}
            placeholder="Please best describe your current mental health"
            onChange={handleMentalHealthChange}
          />
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
          <TextField
            sx={{ display: "block" }}
            placeholder="Please enter your dietary requirements"
            onChange={handleDietaryRequirementsChange}
          />
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
          <TextField
            placeholder="Please enter your allergies"
            onChange={handleAllergiesChange}
          />
        )}
      </FormControl>
      <ButtonDark onClick={handleSubmit(handleCreateCarePlan)}>
        Update
      </ButtonDark>
      <Stack spacing={4}>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Create your care plan
        </LoadingButton>
        {error && (
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "red" }}
            align="center"
          >
            Failed to create care plan. Please try again.
          </Typography>
        )}
        {carePlanSuccess && (
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "green" }}
            align="center"
          >
            Care plan successfully create!
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
