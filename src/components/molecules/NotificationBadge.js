import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const NotificationBadge = ({ notificationCount }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      <Badge color="info" badgeContent={notificationCount}>
        <NotificationsIcon sx={{ color: "#eef5dbff" }} />
      </Badge>
    </Box>
  );
};
