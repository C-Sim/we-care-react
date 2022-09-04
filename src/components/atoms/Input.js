import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Input = ({ label, helperText, register }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <TextField
      label={label}
      variant="outlined"
      helperText={helperText}
      sx={{ width: isMobile ? "90%" : "50%" }}
    />
  );
};
