import Button from "@mui/material/Button";

export const ButtonDark = ({ label, type }) => {
  return (
    <Button
      className="button"
      variant="contained"
      type={type}
      sx={{
        fontWeight: 100,
        backgroundColor: "#3f3d56",
        color: "#eef5dbff",
        "&:hover": { backgroundColor: "#f7b801" },
        width: "50%",
        borderRadius: "18px",
      }}
    >
      {label}
    </Button>
  );
};
