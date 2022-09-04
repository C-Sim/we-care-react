import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import GitHub from "@mui/icons-material/GitHub";

import { ProfileAvatar } from "../atoms/Avatar";
import { AlignVerticalCenter } from "@mui/icons-material";

export const Footer = () => {
  return (
    // <Box sx={{ display: "flex" }} component="footer-box">
    <Box
      component="footer"
      width="100vw"
      sx={{
        backgroundColor: "#3f3d56",
        color: "#eef5dbff",
        display: "flex",
        alignItems: "center",
        m: 0,
        p: 0,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <ProfileAvatar
            image="../atoms/images/WeCare-hands.png"
            imageAlt="WeCare logo"
          />
          <Typography
            sx={{
              textAlign: "center",
              pl: 4,
              pr: 4,
            }}
          >
            WeCare &copy; 2022
          </Typography>
        </Box>

        {/* <IconButton
          sx={{
            textAlign: "center",
            color: "#eef5dbff",
            pl: 4,
            pr: 4,
          }}
          key="GitHub Repo"
          href="https://github.com/C-Sim/we-care-react"
          target="_blank"
          className="icon"
        >
          <GitHub />
        </IconButton> */}

        <Stack sx={{ fontSize: "0.5rem" }}>
          <Typography sx={{ fontSize: "0.6rem" }}>
            University of Birmingham B29 6AG
          </Typography>
          <Typography sx={{ fontSize: "0.6rem", textAlign: "right" }}>
            Info@WeCare.com
          </Typography>
          <Typography sx={{ fontSize: "0.6rem", textAlign: "right" }}>
            0121 444 8888
          </Typography>
        </Stack>
      </Toolbar>
    </Box>
    // </Box>
  );
};
