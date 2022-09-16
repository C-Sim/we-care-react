// For patients to view their own care plan

import { CarePlanForm } from "../components/organisms/CarePlan";
import { PageTitle } from "../components/atoms/PageTitle";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { Divider } from "@mui/material";
export const CarePlanPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        borderRadius: "25px",
        margin: 6,
        background: `linear-gradient(
          to top,
          rgba(238, 245, 219, 0.2),
          rgba(0, 176, 255, 0.18)
        )`,
      }}
    >
      <PageTitle title="Your Care Plan" />
      <Divider
        sx={{
          marginLeft: 9,
          marginRight: 9,
        }}
        variant="middle"
      />
      <CarePlanForm />
    </Box>
  );
};
