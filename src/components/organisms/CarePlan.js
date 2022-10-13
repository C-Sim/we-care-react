import * as React from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";

import { CREATE_CARE_PLAN } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

export const CarePlanForm = ({ isMobile }) => {
  //state for create care plan success
  const [carePlanSuccess, setCarePlanSuccess] = useState(false);

  //mutations
  const [createCarePlan, { data: createData, loading, error }] = useMutation(
    CREATE_CARE_PLAN,
    {
      onCompleted: (createData) => {
        createData.createCarePlan.success && setCarePlanSuccess(true);
      },
    }
  );

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
  const navigate = useNavigate();

  useEffect(() => {
    if (createData?.createCarePlan?.success) {
      navigate("/patient-dashboard", { replace: true });
    }
  }, [createData]);

  const handleCreateCarePlan = async (formData) => {
    const carePlanFields = {
      disabilities: formData.disabilities,
      mobility: formData.mobility,
      communication: formData.communication,
      allergies: formData.allergies,
      personalCare: formData.personalCare,
      mentalHealth: formData.mentalHealth,
      dietaryRequirements: formData.dietaryRequirements,
    };
    let carePlanInput = {};
    Object.entries(carePlanFields).forEach(([key, value]) => {
      if (value) {
        carePlanInput[key] = value;
      }
    });

    await createCarePlan({
      variables: {
        carePlanInput,
      },
    });
  };

  //care plan check boxes

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
      <Stack
        component="form"
        sx={{ p: 3 }}
        spacing={4}
        onSubmit={handleSubmit(handleCreateCarePlan)}
      >
        <Stack>
          <FormControl>
            <FormLabel component="legend">
              Do you have any disabilities?
            </FormLabel>
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
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-flexible"
                label="Please best describe your disabilities"
                multiline
                onChange={handleDisabilitiesChange}
                {...register("disabilities", {
                  required: true,
                })}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel component="legend">
              Do you currently have any mobility issues?
            </FormLabel>
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
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-flexible"
                label="Please best describe your mobility"
                multiline
                onChange={handleMobilityChange}
                {...register("mobility", {
                  required: true,
                })}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel component="legend">
              Do you currently have any communication problems?
            </FormLabel>
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
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-flexible"
                label="Please enter any communication problems?"
                multiline
                onChange={handleCommunicationChange}
                {...register("communication", {
                  required: true,
                })}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel component="legend">
              Do you have any Personal Care issues?
            </FormLabel>
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
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-flexible"
                label="Please enter any Personal Care issues?"
                multiline
                onChange={handlePersonalCareChange}
                {...register("personalCare", {
                  required: true,
                })}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel component="legend">
              Do you have any mental health issues?
            </FormLabel>
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
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-flexible"
                label="Please enter any mental health issues?"
                multiline
                onChange={handleMentalHealthChange}
                {...register("mentalHealth", {
                  required: true,
                })}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel component="legend">
              Do you have any dietary requirements?
            </FormLabel>
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
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-flexible"
                label="Please enter your dietary requirements?"
                multiline
                onChange={handleDietaryRequirementsChange}
                {...register("dietaryRequirements", {
                  required: true,
                })}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel component="legend">Do you have any allergies?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="allergies"
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
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-flexible"
                label="Please enter your allergies?"
                multiline
                onChange={handleAllergiesChange}
                {...register("allergies", {
                  required: true,
                })}
              />
            )}
          </FormControl>
        </Stack>
        <Stack spacing={4}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{
              marginRight: 3,
              marginLeft: 3,
              fontWeight: 100,
              backgroundColor: "#3f3d56",
              color: "#eef5dbff",
              "&:hover": { backgroundColor: "#f7b801" },
              borderRadius: "18px",
            }}
          >
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
        </Stack>
      </Stack>
    </Box>
  );
};
