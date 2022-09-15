import Button from "@mui/material/Button";

export const ButtonBright = ({ id, label, type, onClick }) => {
  return (
    <Button
      className="button"
      variant="contained"
      type={type}
      id={id}
      sx={{
        fontWeight: 100,
        backgroundColor: "#00b0ff",
        color: "#eef5dbff",
        "&:hover": { backgroundColor: "#f7b801" },
        borderRadius: "18px",
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
