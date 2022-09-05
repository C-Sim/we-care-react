import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export const ReviewEditable = ({ value, setValue }) => {
  return (
    <Box>
      <Typography component="legend">Rate our service</Typography>

      <Rating
        name="simple-controlled size-medium"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};
