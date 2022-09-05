import * as React from "react";
import TextField from "@mui/material/TextField";

export const InputDisabled = ({ label, value }) => {
  return (
    <div>
      <TextField disabled id="outlined-disabled" label={label} value={value} />
    </div>
  );
};
