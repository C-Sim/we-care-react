import { useState, useRef, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";

import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
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
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: "all",
  });

  const carer = appointmentDetail.carerId.id;
  const [noteText, setNoteText] = useState();

  const [nextVisitRefresh, setNextVisitRefresh] = useState(0);

  const CarerCard = () => {
    return (
      <Card sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ maxWidth: 400 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Your carer: {appointmentDetail.carerId.carerProfileId.username}
          </Typography>
          <CardMedia
            component="img"
            height="100"
            image={appointmentDetail.carerId.imageUrl}
            alt="Carer image"
          />
          <Typography variant="body2">
            Gender: {appointmentDetail.carerId.carerProfileId.gender}
          </Typography>
          <Typography variant="body2">
            Email: {appointmentDetail.carerId.email}
          </Typography>
          <Typography variant="body2">
            Phone number:
            {appointmentDetail.carerId.phoneNumber}
          </Typography>
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
            Update carer notes
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
    <Paper
      sx={{
        p: 6,
        width: "60%",
        minHeight: "60%",
        position: "absolute",
        right: 1,
        top: 150,
      }}
      elevation={6}
    >
      <div>
        <Typography component="h1" variant="h6" align="left" sx={{ mb: 2 }}>
          Your appointment details
        </Typography>

        <h4>Date: {format(new Date(appointmentDetail.start), "yyyy-MM-dd")}</h4>
        <h4>
          Start Time: {format(new Date(appointmentDetail.start), "HH:mm")}
        </h4>
        <div>
          <CarerCard />
        </div>
      </div>
      <UpdateNotes />
    </Paper>
  );
};
