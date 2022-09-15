// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import * as React from "react";
import * as V from "victory";
import { useNavigate } from "react-router-dom";
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from "victory";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Typography } from "@mui/material";
import { ButtonDark } from "../components/atoms/ButtonDark";

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
  const navigate = useNavigate();

  return (
    <div>
      <Typography component="h1" variant="h4" align="center" sx={{ p: 3 }}>
        My Team
      </Typography>

      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box sx={{ height: 400 }}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            Overall gender preferences distribution
          </Typography>
          <VictoryPie
            colorScale={["pink", "#61dafb", "grey"]}
            data={genderPreference}
          />
        </Box>
        <Box sx={{ height: 400 }}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            Overall gender distribution
          </Typography>
          <VictoryPie colorScale={["pink", "#61dafb", "grey"]} data={gender} />
        </Box>
        <Box sx={{ height: 400 }}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            Carers availability - Distribution over weekdays
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
