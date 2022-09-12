//need to complete styling format logo on nav bar and set nav link buttons to the right.

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
import Grid from "@mui/material/Grid";
import logo from "../atoms/images/WeCare-1_260x60.png";
import useMediaQuery from "@mui/material/useMediaQuery";

export const NavBar = ({ navItems }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <List>
        {navItems.public.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "centre",
                backgroundColor: "#d0cde1",
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
            <img src={logo} height="45"></img>
            {/* <img
              image={logo}
              imageAlt="We Care logo"
              alignItems="center"
              boxSizing="border-box"
            /> */}
          </Box>
          <Box
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: 100,
            }}
          >
            <Grid item xs={4}>
              {navItems.public.map((item) => (
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
            </Grid>
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
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
