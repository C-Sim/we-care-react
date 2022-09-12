import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import { format } from "date-fns";

export const DraftTimeline = ({ date, appointments }) => {
  const formatToTime = (item) => {
    return format(new Date(item), "hh:mm");
  };
  return (
    <React.Fragment>
      <Typography align="center" color="#00b0ff" fontWeight={200}>
        Visits for {date}
      </Typography>

      <Timeline sx={{ color: "#3f3d56" }}>
        {appointments.map((appointment) => (
          <TimelineItem key={appointment.patientId}>
            <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2">
              {formatToTime(appointment.start)}
            </TimelineOppositeContent>
            <TimelineSeparator sx={{ color: "#00b0ff" }}>
              <TimelineDot
                sx={{
                  bgcolor: "#00b0ff",
                }}
              >
                <HomeIcon />
              </TimelineDot>

              <TimelineConnector sx={{ bgcolor: "#00b0ff" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ m: "auto 0" }} variant="body2">
              <Typography fontSize="0.8rem">{appointment.title}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </React.Fragment>
  );
};
