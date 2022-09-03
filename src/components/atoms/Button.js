import Button from "@mui/material/Button";

export const Button = ({ label }) => {
  return (
    <Stack spacing={2}>
      <Button
        className="button"
        variant="contained"
        type="submit"
        sx={{
          fontWeight: 100,
          backgroundColor: "#4f6367ff",
          color: "#eef5dbff",
          "&:hover": { backgroundColor: "#4f6367ff" },
        }}
      >
        Send Message
      </Button>

      {emailError && (
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "red" }}
          align="center"
        >
          Failed to send message. Please try again.
        </Typography>
      )}
    </Stack>
  );
};
