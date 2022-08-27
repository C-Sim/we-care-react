import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SignUpForm } from "../components/organisms/SignUpForm";
import signUpImage from "../components/atoms/images/sign-up.svg";

export const SignUpPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Grid container sx={{ minHeight: "95vh" }}>
      {!isMobile && (
        <Grid item md={6}>
          <img src={signUpImage} />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(
            to top,
            rgba(20, 20, 20, 0.2),
            rgba(133, 133, 133, 0.2)
          )`,
        }}
      >
        <SignUpForm isMobile={isMobile} />
      </Grid>
    </Grid>
  );
};
