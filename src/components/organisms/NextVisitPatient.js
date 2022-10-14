import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import { format } from "date-fns";
import { UPDATE_PATIENT_NOTES } from "../../graphql/mutations";

export const NextVisitPatient = ({ appointmentDetail }) => {
  const [noteSuccess, setNoteSuccess] = useState(false);
  const [
    updatePatientNotes,
    {
      data: patientNotesData,
      loading: patientNotesLoading,
      error: patientNotesError,
    },
  ] = useMutation(UPDATE_PATIENT_NOTES, {
    onCompleted: () => {
      setNoteSuccess(true);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const CarerCard = () => {
    return (
      <Card width="100%">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 14 }} color="#3f3d56" gutterBottom>
              <strong>Your carer:</strong>{" "}
              {appointmentDetail.carerId.carerProfileId.username}
            </Typography>

            <Typography variant="body2">
              <strong>Gender:</strong>{" "}
              {appointmentDetail.carerId.carerProfileId.gender}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {appointmentDetail.carerId.email}
            </Typography>
            <Typography variant="body2">
              <strong>Phone number:</strong>{" "}
              {appointmentDetail.carerId.phoneNumber}
            </Typography>
          </Box>
          <Box>
            <CardMedia
              component="img"
              height="80"
              width="20"
              image={appointmentDetail.carerId.imageUrl}
              alt="Carer image"
              align="right"
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

  const UpdateNotes = () => {
    const handleUpdateNotes = (formData) => {
      const trigger = "patientNote";
      const note = formData.patientNote;

      updatePatientNotes({
        variables: {
          appointmentId: appointmentDetail.id,
          trigger,
          appointmentUpdateInput: {
            note: note.trim(),
          },
        },
      });
    };

    return (
      <Stack
        component="form"
        sx={{ pt: 3 }}
        spacing={4}
        onSubmit={handleSubmit(handleUpdateNotes)}
      >
        <Stack>
          <Typography variant="body2">
            Would you like to add a note for your carer?
          </Typography>
          <FormControl>
            <TextField
              sx={{ width: "500px", mt: 2 }}
              name="patientNote"
              required
              error={!!errors.patientNote}
              id="patientNote"
              label="Patient's note"
              multiline
              row={4}
              variant="outlined"
              helperText={
                !!errors.patientNote
                  ? "Please enter your special care requirements here "
                  : ""
              }
              {...register("patientNote", {
                required: true,
              })}
            />
          </FormControl>
        </Stack>
        <Stack>
          <LoadingButton
            id={appointmentDetail.id}
            variant="Contained"
            type="submit"
            loading={patientNotesLoading}
            sx={{
              fontWeight: 100,
              backgroundColor: "#3f3d56",
              color: "#eef5dbff",
              "&:hover": { backgroundColor: "#f7b801" },
              borderRadius: "18px",
            }}
          >
            Update appointment notes
          </LoadingButton>
          {noteSuccess && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "green" }}
              align="center"
            >
              Notes successfully updated.
            </Typography>
          )}
          {patientNotesError && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "red" }}
              align="center"
            >
              Failed to update notes. Please try again.
            </Typography>
          )}
        </Stack>
      </Stack>
    );
  };

  return (
    <Box
      sx={{
        p: 6,
        pr: 12,
        width: "60%",
        minHeight: "64%",
        position: "absolute",
        right: 1,
        top: 150,
      }}
      elevation={6}
    >
      <div>
        <Typography
          component="h1"
          variant="h6"
          align="center"
          sx={{ mb: 2, color: "#3f3d56", fontWeight: "200" }}
        >
          Your appointment details
        </Typography>

        <Typography
          align="center"
          sx={{ mb: 2, color: "#00b0ff", fontWeight: "200" }}
        >
          <strong>Date</strong>{" "}
          {format(new Date(appointmentDetail.start), "yyyy-MM-dd")}
        </Typography>
        <Typography
          align="center"
          sx={{ mb: 2, color: "#00b0ff", fontWeight: "200" }}
        >
          <strong>Time</strong>{" "}
          {format(new Date(appointmentDetail.start), "HH:mm")}
        </Typography>
        <div>
          <CarerCard />
        </div>
      </div>
      <UpdateNotes />
    </Box>
  );
};
