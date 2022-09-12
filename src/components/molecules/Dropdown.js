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
  handleSelect,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [displayValue, setDisplayValue] = useState(defaultSelection);

  const handleChange = (e) => {
    setDisplayValue(e.target.value);
    handleSelect(e);
  };

  return (
    <div>
      <FormControl required={required} sx={{ width: isMobile ? "90%" : "80%" }}>
        <InputLabel id="demo-simple-select-required-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={displayValue}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};
