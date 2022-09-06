import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { HowItWorks } from "../components/molecules/HowItWorks";
import { LandingHero } from "../components/molecules/LandingHero";
import { ReviewFixed } from "../components/molecules/ReviewFixed";

export const LandingPage = () => {
  return (
    <Box>
      <LandingHero />

      <HowItWorks />

      <Box align="center" m={4}>
        <ReviewFixed align="center" value="4.5" />

        <Typography fontSize="0.8rem" fontWeight={100}>
          Read our reviews to see what our users have to say about us
        </Typography>
      </Box>
    </Box>
  );
};
