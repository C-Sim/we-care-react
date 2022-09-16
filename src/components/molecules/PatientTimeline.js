import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Button from "@mui/material/Button";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import { Paper } from "@mui/material";
import { format } from "date-fns";

export const PatientTimeline = ({ appointments, viewAppointment }) => {
  return (
    <Paper
      sx={{
        p: 5,
        width: "40%",
        minHeight: "60%",
        top: 150,
        margin: 2,
      }}
    >
      <Typography align="center" color="#00b0ff" fontWeight={200}>
        Your upcoming appointments
      </Typography>

      <Timeline sx={{ color: "#3f3d56" }}>
        {appointments.map((visit) => (
          <TimelineItem key={visit.id}>
            <TimelineOppositeContent>
              <Typography fontSize="0.9rem">
                {format(new Date(visit.start), "yyyy-MM-dd")}
              </Typography>
              <Typography variant="body2">
                {format(new Date(visit.start), "HH:mm")}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator sx={{ color: "#00b0ff" }}>
              <TimelineDot sx={{ bgcolor: "#00b0ff" }}>
                {visit.carerId.carerProfileId.gender === "male" ? (
                  <ManIcon />
                ) : (
                  <WomanIcon />
                )}
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#00b0ff" }} />
            </TimelineSeparator>
            <TimelineContent>
              <Button
                variant="Contained"
                onClick={viewAppointment}
                id={visit.id}
              >
                Carer: {visit.carerId.carerProfileId.username}
              </Button>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
};
