// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import * as React from "react";
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from "victory";
import Box from "@mui/material/Box";
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
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Spread per day - Bar Chart",
      },
    },
  };

  const labels = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const patientsPerDay = [10, 15, 20, 15, 20, 15, 15];
  const carersPerDay = [15, 25, 30, 30, 30, 20, 15];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: patientsPerDay,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: carersPerDay,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Box sx={{ backgroundColor: "#61dafb" }}>
        <h1>Welcome to the Supervisor dashboard</h1>
      </Box>

      <Box sx={{ height: 600 }}>
        <VictoryPie colorScale={["pink", "#61dafb"]} data={genderPreference} />
      </Box>
      <Box sx={{ height: 600 }}>
        <VictoryPie colorScale={["pink", "#61dafb", "grey"]} data={gender} />
      </Box>
      <Box sx={{ height: 600 }}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar style={{ data: { fill: "#c43a31" } }} data={carerDays} />
        </VictoryChart>
      </Box>
      <Box sx={{ height: 600 }}>
        <Bar options={(options, { maintainAspectRatio: false })} data={data} />
      </Box>
      <Typography component="h4" variant="h4" align="center">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </Typography>
      <Typography component="h4" variant="h4" align="center">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </Typography>
      <Typography component="h4" variant="h4" align="center">
        xxxxxxxxxxxxxxxxxxxxxxxxxxx
      </Typography>
    </div>
  );
};
