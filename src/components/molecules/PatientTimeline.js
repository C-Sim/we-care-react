import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";

export const PatientTimeline = ({ date, time, carerName }) => {
  return (
    <React.Fragment>
      <Typography align="center" color="#00b0ff" fontWeight={200}>
        Your Upcoming Visits
      </Typography>
      <Timeline position="alternate" sx={{ color: "#3f3d56" }}>
        <TimelineItem>
          <TimelineOppositeContent>
            {date} at {time}
          </TimelineOppositeContent>
          <TimelineSeparator sx={{ color: "#00b0ff" }}>
            <TimelineDot sx={{ bgcolor: "#00b0ff" }} />
            <TimelineConnector sx={{ bgcolor: "#00b0ff" }} />
          </TimelineSeparator>
          <TimelineContent>{carerName}</TimelineContent>
        </TimelineItem>
      </Timeline>
    </React.Fragment>
  );
};
