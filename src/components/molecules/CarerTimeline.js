import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";

export const CarerTimeline = ({ date, patients }) => {
  return (
    <React.Fragment>
      <Typography align="center" color="#00b0ff" fontWeight={200}>
        Your visits for {date}
      </Typography>

      <Timeline sx={{ color: "#3f3d56" }}>
        {patients.map((patient) => (
          <TimelineItem>
            <TimelineOppositeContent>{patient.time}</TimelineOppositeContent>
            <TimelineSeparator sx={{ color: "#00b0ff" }}>
              <TimelineDot
                sx={{
                  bgcolor:
                    patient.timeFrame === "past"
                      ? "#00b0ff2e"
                      : patient.timeFrame === "current"
                      ? "#f7b801"
                      : "#00b0ff",
                }}
              />
              <TimelineConnector sx={{ bgcolor: "#00b0ff" }} />
            </TimelineSeparator>
            <TimelineContent>{patient.patientName}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </React.Fragment>
  );
};
