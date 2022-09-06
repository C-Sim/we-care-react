import * as React from "react";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

export const InputDisabled = ({ label, value }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <TextField
        disabled
        id="outlined-disabled"
        label={label}
        value={value}
        sx={{ width: isMobile ? "90%" : "80%" }}
      />
    </div>
  );
};
