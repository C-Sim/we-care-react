import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import hands from "../atoms/images/WeCare-hands.png";

import { ProfileAvatar } from "../atoms/Avatar";

export const Footer = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Grid
      container
      component="footer"
      width="100vw"
      bottom={0}
      sx={{
        backgroundColor: "#3f3d56",
        color: "#eef5dbff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        m: 0,
        p: 2,
        position: "fixed",
      }}
    >
      <Grid
        item
        xs={6}
        md={8}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ProfileAvatar image={hands} imageAlt="WeCare logo" />
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 100,
            pl: isMobile ? 0 : 2,
          }}
        >
          WeCare &copy; 2022
        </Typography>
      </Grid>

      <Grid item xs={6} md={4}>
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontSize: "0.6rem",
              textAlign: isMobile ? "left" : "right",
              fontWeight: 100,
            }}
          >
            University of Birmingham B29 6AG
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              textAlign: isMobile ? "left" : "right",
              fontWeight: 100,
            }}
          >
            Info@WeCare.com
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              textAlign: isMobile ? "left" : "right",
              fontWeight: 100,
            }}
          >
            0121 444 8888
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
