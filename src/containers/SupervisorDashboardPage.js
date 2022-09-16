// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import * as React from "react";
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from "victory";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { PageTitle } from "../components/atoms/PageTitle";

const genderPreference = [
  { x: "female", y: 35 },
  { x: "male", y: 40 },
  { x: "none", y: 55 },
];

const gender = [
  { x: "female", y: 60 },
  { x: "male", y: 40 },
];

const carerDays = [
  { x: "monday", y: 35 },
  { x: "tuesday", y: 40 },
  { x: "wednesday", y: 55 },
];

export const SupervisorDashboardPage = () => {
  return (
    <div>
      <PageTitle title="My Team" />

      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box sx={{ height: 400 }}>
          <Typography
            component="h4"
            variant="h6"
            align="center"
            sx={{ mb: 2, fontWeight: "100", color: "#00b0ff", fontSize: 16 }}
          >
            Overall Gender Preferences Distribution
          </Typography>
          <VictoryPie
            colorScale={["pink", "#61dafb", "grey"]}
            data={genderPreference}
          />
        </Box>
        <Box sx={{ height: 400 }}>
          <Typography
            component="h4"
            variant="h6"
            align="center"
            sx={{ mb: 2, fontWeight: "100", color: "#00b0ff", fontSize: 16 }}
          >
            Overall Gender Distribution
          </Typography>
          <VictoryPie colorScale={["pink", "#61dafb", "grey"]} data={gender} />
        </Box>
        <Box sx={{ height: 400 }}>
          <Typography
            component="h4"
            variant="h6"
            align="center"
            sx={{ mb: 2, fontWeight: "100", color: "#00b0ff", fontSize: 16 }}
          >
            Carer Availability - Distribution Over Weekdays
          </Typography>
          <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              data={carerDays}
            />
          </VictoryChart>
        </Box>
      </Stack>
    </div>
  );
};
