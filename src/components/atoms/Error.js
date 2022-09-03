import Typography from "@mui/material/Typography";

export const Error = ({ message }) => {
  return (
    <Typography
      variant="caption"
      component="div"
      sx={{ color: "red" }}
      align="center"
    >
      {message}
    </Typography>
  );
};
