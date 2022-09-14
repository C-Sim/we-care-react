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
      borderRadius={25}
      sx={{
        marginTop: 2,
        marginBottom: 1,
        marginLeft: 1,
        marginRight: 1,
        backgroundColor: "rgba(97, 218, 251, 0.2)",
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
