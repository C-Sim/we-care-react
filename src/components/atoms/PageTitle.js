import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export const PageTitle = ({ title }) => {
  return (
    <Box>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          paddingTop: 4,
          color: "#3f3d56",
          fontWeight: 100,
          fontSize: 32,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
