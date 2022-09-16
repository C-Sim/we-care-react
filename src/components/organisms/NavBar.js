import { useState } from "react";
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

export const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user, setIsLoggedIn } = useAuth();

  const logOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = getNavItems(isLoggedIn, user?.accountType);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "#d0cde1" }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "centre",
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
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path, { replace: true });
                }}
              >
                {item.label}
              </Button>
            ))}
            {isLoggedIn && (
              <Button sx={{ color: "#fff" }} onClick={logOut}>
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
              }}
              onClick={logOut}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          )}
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
