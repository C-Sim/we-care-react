// For patients to view their own care plan

import { CarePlanForm } from "../components/organisms/CarePlan";
import { PageTitle } from "../components/atoms/PageTitle";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
export const CarePlanPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      marginTop={2}
      marginBottom={2}
      marginLeft={2}
      marginRight={2}
      borderRadius={25}
      sx={{
        backgroundColor: "rgba(97, 218, 251, 0.2)",
      }}
    >
      <PageTitle title="Your Care Plan" />
      <CarePlanForm />;
    </Box>
  );
};
