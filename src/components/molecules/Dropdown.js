import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Dropdown = ({
  label,
  helperText,
  defaultSelection,
  options,
  required,
}) => {
  const [value, setValue] = useState(defaultSelection);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <FormControl required={required} sx={{ width: isMobile ? "90%" : "80%" }}>
        <InputLabel id="demo-simple-select-required-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};
