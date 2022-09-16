import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import { format } from "date-fns";

import { useState, useRef, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { ButtonDisabled } from "../atoms/ButtonDisabled";
import { UPDATE_CHECKIN } from "../../graphql/mutations";
import { UPDATE_CHECKOUT } from "../../graphql/mutations";
import { UPDATE_CARER_NOTES } from "../../graphql/mutations";
import { PAST_NOTES, VIEW_PATIENT_PROFILE } from "../../graphql/queries";
import { useMediaQuery } from "@mui/material";

export const NextVisitForCarer = ({
  appointmentDetail,
  handleStatusChange,
}) => {
  // MediaQuery for mobile viewport
  const isMobile = useMediaQuery("(max-width:900px)");

  //state variables for each button
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);
  const inputRef = useRef(null);

  //mutations for each button
  const [
    updateCheckin,
    { data: checkinData, loading: checkinLoading, error: checkinError },
  ] = useMutation(UPDATE_CHECKIN, {
    onCompleted: () => {
      setCheckedIn(true);
      handleStatusChange("checkin");
    },
  });
  const [
    updateCheckout,
    { data: checkoutData, loading: checkoutLoading, error: checkoutError },
  ] = useMutation(UPDATE_CHECKOUT, {
    onCompleted: () => {
      setCheckedOut(true);
      handleStatusChange("checkout");
    },
  });
  const [
    updateCarerNotes,
    {
      data: carerNotesData,
      loading: carerNotesLoading,
      error: carerNotesError,
    },
  ] = useMutation(UPDATE_CARER_NOTES, {
    onCompleted: () => {
      setNoteSuccess(true);
    },
  });
  const [
    getPastNotes,
    { data: notesData, loading: notesLoading, error: notesError },
  ] = useLazyQuery(PAST_NOTES, {
    fetchPolicy: "network-only",
  });
  const [
    getPatientProfile,
    { data: patientData, loading: patientLoading, error: patientError },
  ] = useLazyQuery(VIEW_PATIENT_PROFILE, {
    fetchPolicy: "network-only",
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

  const status = appointmentDetail.status;
  const patient = appointmentDetail.patientId.id;

  const [pastVisitNotesBtn, setPastVisitNoteBtn] = useState(false);
  const [patientProfileBtn, setPatientProfileBtn] = useState(false);
  const [nextVisitRefresh, setNextVisitRefresh] = useState(0);

  // useEffects hooks to monitors changes in next visit container
  useEffect(() => {
    const count = nextVisitRefresh + 1;
    setNextVisitRefresh(count);
  }, [patient]);
  useEffect(() => {
    setPastVisitNoteBtn(false);
    setPatientProfileBtn(false);
  }, [nextVisitRefresh]);

  //function to check in/ check out of appointment
  const CheckInAndOut = () => {
    const checkin = (event) => {
      const trigger = "checkin";
      updateCheckin({
        variables: {
          appointmentId: event.target.id,
          trigger,
        },
      });
    };

    const checkout = (event) => {
      const trigger = "checkout";
      updateCheckout({
        variables: {
          appointmentId: event.target.id,
          trigger,
        },
      });
    };

    return (
      <>
        {status === "upcoming" && !checkedIn && (
          <Button
            className="button"
            variant="contained"
            sx={{
              fontWeight: 100,
              backgroundColor: "#00b0ff",
              color: "#eef5dbff",
              "&:hover": { backgroundColor: "#f7b801" },
              borderRadius: "18px",
            }}
            id={appointmentDetail.id}
            onClick={checkin}
          >
            Check In
          </Button>
        )}
        {status === "upcoming" && checkedIn && <CheckIcon />}
        {status === "ongoing" && !checkedOut && (
          <Button
            className="button"
            variant="contained"
            sx={{
              fontWeight: 100,
              backgroundColor: "#00b0ff",
              color: "#eef5dbff",
              "&:hover": { backgroundColor: "#f7b801" },
              borderRadius: "18px",
            }}
            id={appointmentDetail.id}
            onClick={checkout}
          >
            Check Out
          </Button>
        )}
        {status === "ongoing" && checkedOut && <CheckIcon />}
        {status === "completed" && (
          <ButtonDisabled label="completed" type="button" />
        )}
      </>
    );
  };

  const UpdateNotes = () => {
    const handleUpdateNotes = (formData) => {
      const trigger = "carerNote";
      const note = formData.carerNote;

      updateCarerNotes({
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
          <TextField
            sx={{ width: "500px", mt: 2 }}
            required
            id="carerNote"
            label="Carer's note"
            multiline
            row={4}
            variant="filled"
            helperText={
              !!errors.carerNote ? "Please enter your note here " : ""
            }
            {...register("carerNote", {
              required: true,
            })}
          />
        </Stack>
        <Stack>
          <LoadingButton
            id={appointmentDetail.id}
            variant="Contained"
            type="submit"
            loading={carerNotesLoading}
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
          {carerNotesError && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "red" }}
              align="center"
            >
              Failed to sign up. Please try again.
            </Typography>
          )}
        </Stack>
      </Stack>
    );
  };

  const BtnPatientProfile = () => {
    const viewPatientProfile = (event) => {
      const patientId = event.target.id;
      setPastVisitNoteBtn(false);
      setPatientProfileBtn(true);
      getPatientProfile({
        variables: {
          userId: patientId,
        },
      });
    };

    const hidePatientProfile = () => {
      setPatientProfileBtn(false);
    };

    return (
      <>
        {!patientProfileBtn && (
          <Button
            variant="Contained"
            onClick={viewPatientProfile}
            id={appointmentDetail.patientId.id}
          >
            View Patient Profile
          </Button>
        )}
        {patientProfileBtn && (
          <Button variant="Contained" onClick={hidePatientProfile} id="hide">
            Hide Patient Profile
          </Button>
        )}
      </>
    );
  };

  const PatientProfileBtn = () => {
    if (patientProfileBtn) {
      if (patientData) {
        return (
          <>
            <Typography
              key="username"
              component="h3"
              variant="caption"
              align="left"
              sx={{ mb: 2 }}
            >
              Patient name: {patientData.patientInfo.username}
            </Typography>
            <Typography
              key="email"
              component="h3"
              variant="caption"
              align="left"
              sx={{ mb: 2 }}
            >
              Email: {patientData.patientInfo.userId.email}
            </Typography>
            <Typography
              key="phoneNumber"
              component="h3"
              variant="caption"
              align="left"
              sx={{ mb: 2 }}
            >
              Phone number: {patientData.patientInfo.userId.phoneNumber}
            </Typography>
            <Typography
              key="gender"
              component="h3"
              variant="caption"
              align="left"
              sx={{ mb: 2 }}
            >
              Gender : {patientData.patientInfo.gender}
            </Typography>
            <Typography
              key="genderPreference"
              component="h3"
              variant="caption"
              align="left"
              sx={{ mb: 2 }}
            >
              Gender preference (for carer gender):{" "}
              {patientData.patientInfo.genderPreference}
            </Typography>
            <Typography
              key="days"
              component="h3"
              variant="caption"
              align="left"
              sx={{ mb: 2 }}
            >
              Days when care needed: {patientData.patientInfo.days.join("-")}
            </Typography>
          </>
        );
      } else {
        return (
          <>
            <Typography
              key="no-notes"
              component="h1"
              variant="h6"
              align="left"
              sx={{ mb: 2 }}
            >
              No Carer notes for this patient yet.
            </Typography>
          </>
        );
      }
    }
  };

  const BtnPastVisitNotes = () => {
    const viewPastNotes = () => {
      setPatientProfileBtn(false);
      setPastVisitNoteBtn(true);

      getPastNotes({
        variables: {
          userId: appointmentDetail.patientId.id,
        },
      });
    };

    const hidePastNotes = () => {
      setPastVisitNoteBtn(false);
    };

    return (
      <>
        {!pastVisitNotesBtn && (
          <Button variant="Contained" onClick={viewPastNotes}>
            View past notes
          </Button>
        )}
        {pastVisitNotesBtn && (
          <Button variant="contained" onClick={hidePastNotes}>
            Hide Notes
          </Button>
        )}
      </>
    );
  };

  const PastVisitNotesBtn = () => {
    if (pastVisitNotesBtn) {
      if (notesData) {
        return (
          <>
            {notesData.appointmentNotesByUserId.map((note, index) => (
              <Typography
                key={index}
                component="h3"
                variant="caption"
                align="left"
                sx={{ mb: 2 }}
              >
                {format(new Date(note.start), "yyyy-MM-dd")} :{" "}
                {note.carerNotes.join(" - ")}
              </Typography>
            ))}
          </>
        );
      } else {
        return (
          <>
            <Typography
              key="no-notes"
              component="h1"
              variant="h6"
              align="left"
              sx={{ mb: 2 }}
            >
              No Carer notes for this patient yet.
            </Typography>
          </>
        );
      }
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        width: "30%",
        minWidth: isMobile ? "100%" : "400px",
        height: "100%",
        position: "absolute",
        right: 0.1,
      }}
      elevation={6}
    >
      <div>
        <Typography component="h1" variant="h6" align="left" sx={{ mb: 2 }}>
          Your appointment details
        </Typography>
        <h4>{appointmentDetail.title}</h4>
        <h4>
          {appointmentDetail.patientId.patientProfileId.username} |
          {appointmentDetail.patientId.patientProfileId.gender}
        </h4>
        <h4>
          {appointmentDetail.patientId.address.fullAddress} |{" "}
          {appointmentDetail.patientId.postcode}
        </h4>
        <h4>
          Start Time: {format(new Date(appointmentDetail.start), "HH:mm")}
        </h4>
        <h4>End Time: {format(new Date(appointmentDetail.end), "HH:mm")}</h4>
      </div>
      <CheckInAndOut />
      <UpdateNotes />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        sx={{ p: 2 }}
      >
        <BtnPastVisitNotes />
        <BtnPatientProfile />
      </Stack>
      <PastVisitNotesBtn />
      <PatientProfileBtn />
    </Paper>
  );
};
