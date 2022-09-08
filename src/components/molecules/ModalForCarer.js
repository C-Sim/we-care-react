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
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
  createData("Patient:", "Charlie Dean"),
  createData("Visit Date:", "25/08/22"),
  createData("Visit Time:", "12:00"),
  createData("Location:", "Paganel Rd, B29 5TG"),
  createData("Submitted:", "18/08/22"),
  createData("Special Care Requirement:", ""),
];

export const ModalForCarer = () => {
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
        Open Modal For Carer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Appointment Detail
        </DialogTitle>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 430 }} aria-label="simple table">
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
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="text"
            style={{
              width: 200,
            }}
          />
        </TableContainer>

        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
