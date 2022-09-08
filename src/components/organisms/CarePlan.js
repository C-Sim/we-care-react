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

import { ButtonDark } from "../atoms/ButtonDark";

= ({ isMobile }) => {
  const ["", { data, loading, error }] = useMutation("");

  //state for y/n checkboxes
  const [option, setOption] = useState([]);

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

  const [successStatus, setSuccessStatus] = useState(false);
  const [formKey, setFormKey] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.carePlanForm?.success) {
      setSuccessStatus(!successStatus);
    }
  }, [data, navigate]);

  const handleYesNoOption = (value) => {
    console.log(value);
    if (value === "yes") {
      setCheckBoxChecked((checked) => !checked);
    }
    if (value === "no") {
      setCheckBoxChecked((checked) => !checked);
    }
  };

  const resetForm = () => {
    setFormKey(new Date());
    setSuccessStatus(!successStatus);
    //TODO: it brings back the form but it's populated with the previous data
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
