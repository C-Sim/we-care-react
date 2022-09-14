import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import Button from "@mui/material/Button";
import { format } from "date-fns";

export const CarerTimeline = ({ date, appointments, viewAppointment }) => {
  return (
    <React.Fragment>
      <Typography align="center" color="#00b0ff" fontWeight={200}>
        Your Visits for the day: {appointments[0].appointmentDate}
      </Typography>

      <Timeline sx={{ color: "#3f3d56" }}>
        {appointments.map((appointments) => (
          <TimelineItem key={appointments.id}>
            <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2">
              {format(new Date(appointments.start), "HH:mm")}
            </TimelineOppositeContent>
            <TimelineSeparator sx={{ color: "#00b0ff" }}>
              <TimelineDot
                sx={{
                  bgcolor:
                    appointments.status === "completed"
                      ? "#00b0ff2e"
                      : appointments.status === "ongoing"
                      ? "#f7b801"
                      : "#00b0ff",
                }}
              >
                {appointments.patientId.patientProfileId.gender === "male" ? (
                  <ManIcon />
                ) : (
                  <WomanIcon />
                )}
              </TimelineDot>

              <TimelineConnector sx={{ bgcolor: "#00b0ff" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ m: "auto 0" }} variant="body2">
              <Button
                size="small"
                variant="Contained"
                onClick={viewAppointment}
                id={appointments.id}
                address={appointments.patientId.address.fullAddress}
              >
                {appointments.patientId.patientProfileId.username}
                {appointments.patientId.patientProfileId.gender}
                {appointments.patientId.postcode}
              </Button>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </React.Fragment>
  );
};
