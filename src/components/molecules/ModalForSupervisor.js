import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const createData = (rowTitle, rowValue) => {
  return { rowTitle, rowValue };
};

//template data for now
const rows = [
  createData("Carer:", "Alice Bond"),
  createData("Patient:", "Charlie Dean"),
  createData("Submitted:", "18/08/22"),
  createData("Visit Date:", "18/08/22"),
  createData("Visit Time:", "12:00"),
  createData(
    "Comment:",
    "It will be dificult to get across town from my last appointment in time"
  ),
];

export const ModalForSupervisor = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Modal For Supervisor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Request Detail
        </DialogTitle>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 400, maxWidth: 500 }}
            aria-label="simple table"
          >
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.rowTitle}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.rowTitle}
                  </TableCell>
                  <TableCell align="right">{row.rowValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ m: 1, display: "flex", justifyContent: "space-around" }}>
            {" "}
            <Button
              variant="contained"
              color="success"
              endIcon={<CheckCircleIcon />}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<HighlightOffIcon />}
            >
              Deny
            </Button>
          </Box>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "97%" },
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            <TextField
              id="filled-basic"
              label="Enter reason"
              variant="filled"
            />
          </Box>

          <DialogActions>
            <Button autoFocus onClick={handleClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </TableContainer>
      </Dialog>
    </div>
  );
};
