import React from "react";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { format } from "date-fns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TextField } from "@mui/material";

export const DatePicker = ({ handleDateChange }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [value, setValue] = useState(format(new Date(), "yyyy-MM-dd"));

  const handleChange = (newValue) => {
    setValue(newValue);
    handleDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {isMobile && (
        <MobileDatePicker
          label="Date"
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}

      {!isMobile && (
        <DesktopDatePicker
          label="Date"
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    </LocalizationProvider>
  );
};
