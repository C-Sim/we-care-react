import Button from "@mui/material/Button";

export const ButtonDisabled = ({ label, type }) => {
  return (
    <Button
      className="button"
      variant="contained"
      type={type}
      sx={{
        fontWeight: 100,
        backgroundColor: "#00b0ff2e",
        color: "#3f3d56",
        width: "50%",
        borderRadius: "18px",
        "&:hover": { backgroundColor: "#00b0ff2e" },
      }}
    >
      {label}
    </Button>
  );
};
