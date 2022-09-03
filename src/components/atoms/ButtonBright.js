import Button from "@mui/material/Button";

export const ButtonBright = ({ label, type }) => {
  return (
    <Button
      className="button"
      variant="contained"
      type={type}
      sx={{
        fontWeight: 100,
        backgroundColor: "#00b0ff",
        color: "#eef5dbff",
        "&:hover": { backgroundColor: "#c99f32" },
        width: "50%",
        borderRadius: "18px",
      }}
    >
      {label}
    </Button>
  );
};
