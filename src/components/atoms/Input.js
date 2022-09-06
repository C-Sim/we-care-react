import { useState } from "react";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Input = ({ label, helperText }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <TextField
      label={label}
      value={value}
      variant="outlined"
      helperText={helperText}
      onChange={handleChange}
      sx={{ width: isMobile ? "90%" : "80%" }}
    />
  );
};
