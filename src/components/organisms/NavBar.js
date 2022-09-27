import { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../atoms/images/WeCare-1_260x60.png";
import { useAuth } from "../../context/AppProvider";
import { getNavItems } from "../../utils/getNavItems";
import { NotificationBadge } from "../molecules/NotificationBadge";
import { UNREAD_NOTIFICATIONS } from "../../graphql/queries";

export const NavBar = ({ clearClient }) => {
  const [getUnreadCount, { data: unreadData }] =
    useLazyQuery(UNREAD_NOTIFICATIONS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user, setIsLoggedIn } = useAuth();
  const [badgeContent, setBadgeContent] = useState(0);

  const logOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setBadgeContent(0);
    clearClient();
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //useEffects hooks to get unread notification count on load
  useEffect(() => {
    getUnreadCount();
  }, [isLoggedIn]);
  //useEffects hooks to get unread notification count if unreadData changes
  useEffect(() => {
    setBadgeContent(unreadData?.unreadNotificationsByUserId?.unreadCount);
  }, [unreadData]);

  const navItems = getNavItems(isLoggedIn, user?.accountType);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "#d0cde1" }}
    >
      <List>
        <ListItem key="notifications" disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
            }}
            onClick={() => {
              navigate("/notifications", { replace: true });
            }}
          >
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
              }}
              onClick={() => {
                navigate(item.path, { replace: true });
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "64px" }} component="header">
      <AppBar
        position="static"
        component="nav"
        sx={{
          backgroundColor: "#3f3d56",
          color: "#eef5dbff",

          flexDirection: "row",
          alignItems: "center",
          m: 0,
          p: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Box className="LogoNav">
            <img
              src={logo}
              alt="logo"
              height="40"
              onClick={() => {
                navigate("/", { replace: true });
              }}
            ></img>
          </Box>
          <Box
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: 100,
              display: { xs: "none", sm: "block" },
            }}
          >
            {isLoggedIn && (
              <Button
                key="notifications"
                sx={{ color: "#fff", fontWeight: "100" }}
                onClick={() => {
                  navigate("/notifications", { replace: true });
                }}
              >
                <NotificationBadge notificationCount={badgeContent} />
              </Button>
            )}

            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: "#fff", fontWeight: "100" }}
                onClick={() => {
                  navigate(item.path, { replace: true });
                }}
              >
                {item.label}
              </Button>
            ))}
            {isLoggedIn && (
              <Button
                sx={{ color: "#fff", fontWeight: "100" }}
                onClick={logOut}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
          anchor="top"
        >
          {isLoggedIn && (
            <ListItemButton
              className="Logout-btn-drawer"
              sx={{
                backgroundColor: "#d0cde1",
                color: "#212121",
                textAlign: "center",
              }}
              onClick={logOut}
            >
              <ListItemText primary="Log out" />
            </ListItemButton>
          )}
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
