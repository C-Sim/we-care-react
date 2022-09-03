import TextField from "@mui/material/TextField";

export const Input = ({ label, helperText, register }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      helperText={helperText}
      sx={{ width: "50%" }}
    />
  );
};
