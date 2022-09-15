// overview of how the service works
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PageTitle } from "../components/atoms/PageTitle";
import { ButtonDark } from "../components/atoms/ButtonDark";
import { ReviewFixed } from "../components/molecules/ReviewFixed";
import { HowItWorks } from "../components/molecules/HowItWorks";

import logo from "../components/atoms/images/WeCare-dark.png";

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <Box
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "18px",
        }}
      >
        <PageTitle title="Welcome to" />
        <img alt="logo" src={logo} width="300px" height="80px" />
      </Box>
      <Stack spacing={2} p={2} pl={18} pr={18}>
        <Typography fontSize="0.8rem" fontWeight={100} align="center">
          WeCare was created for everyone involved in the provision of care
          services, including care users and our wide network of cares across
          the city of Birmingham.{" "}
        </Typography>

        <Typography fontSize="0.8rem" fontWeight={100} align="center">
          Our aim is to give all users access to all of the care information
          relevant to them in a single place on a digital platform so that they
          can move away from paper-based systems, make in-moment changes and see
          live updates.{" "}
        </Typography>
      </Stack>
      <HowItWorks />
      <Box align="center" m={4} p={4}>
        <ReviewFixed align="center" value="4.5" />

        <Typography fontSize="0.8rem" fontWeight={100}>
          Read our reviews to see what our users have to say about us
        </Typography>
      </Box>
      <Box align="center" pb={4}>
        <ButtonDark
          label="Get Started"
          type="button"
          onClick={() => {
            navigate("/sign-up", { replace: true });
          }}
        />
      </Box>
    </Stack>
  );
};
