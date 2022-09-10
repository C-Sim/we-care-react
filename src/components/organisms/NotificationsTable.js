import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import visuallyHidden from "@mui/utils/visuallyHidden";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { RECEIVED_NOTIFICATIONS } from "../../graphql/queries";
import { UPDATE_READ } from "../../graphql/mutations";

import { ButtonDark } from "../atoms/ButtonDark";
import { ButtonBright } from "../atoms/ButtonBright";

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

//template modal data for now
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

// const Notifications = () => {
//   const { data, loading } = useQuery(RECEIVED_NOTIFICATIONS);

//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   return [createNotification(data.notificationsByUserId)];
// };

const createNotification = (
  id,
  type,
  carer,
  patient,
  notificationDate,
  visitDate,
  visitTime,
  isRead
) => {
  return {
    id,
    type,
    carer,
    patient,
    notificationDate,
    visitDate,
    visitTime,
    isRead,
  };
};

const notifications = [
  createNotification(
    "1",
    "Shift Change",
    "Alice Bond",
    "Charlie Dean",
    "18/08/22",
    "25/08/22",
    "12:00",
    "true"
  ),
  createNotification(
    "2",
    "New Patient",
    "N/A",
    "Abe Zephaniah",
    "18/08/22",
    "N/A",
    "N/A",
    "true"
  ),
  createNotification(
    "3",
    "Shift Change",
    "Alan Bates",
    "Charlie Dean",
    "18/08/22",
    "25/08/22",
    "15:00",
    "false"
  ),
  createNotification(
    "4",
    "New Patient",
    "N/A",
    "Abe Zephaniah",
    "19/08/22",
    "N/A",
    "N/A",
    "true"
  ),
  createNotification(
    "5",
    "Shift Change",
    "Alice Bond",
    "Carol Davies",
    "18/08/22",
    "25/08/22",
    "18:00",
    "false"
  ),
  createNotification(
    "6",
    "Patient Amend",
    "N/A",
    "Abe Zephaniah",
    "20/08/22",
    "N/A",
    "N/A",
    "true"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Type",
  },
  {
    id: "carer",
    numeric: false,
    disablePadding: true,
    label: "Carer",
  },
  {
    id: "patient",
    numeric: false,
    disablePadding: true,
    label: "Patient",
  },

  {
    id: "notificationDate",
    numeric: false,
    disablePadding: false,
    label: "Date Submitted",
  },
  {
    id: "visitDate",
    numeric: false,
    disablePadding: false,
    label: "Visit Date",
  },
  {
    id: "visitTime",
    numeric: false,
    disablePadding: false,
    label: "Visit Time",
  },
  //   {
  //     id: "requestDetail",
  //     numeric: false,
  //     disablePadding: true,
  //     label: "Request Detail",
  //   },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  //   update read status
  const updateRead = useMutation(UPDATE_READ);

  const [updatedNotifications, setUpdatedNotifications] = useState();

  const handleUpdateRead = async (notificationId, userId) => {
    try {
      await updateRead({ variables: { notificationId, userId } });

      setUpdatedNotifications(updatedNotifications);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ backgroundColor: "#00b0ff2e", color: "#3f3d56" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
          <Typography>Filter</Typography>
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const NotificationsTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("notificationDate");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //   const handleSelectAllClick = (event) => {
  //     if (event.target.checked) {
  //       const newSelected = rows.map((n) => n.name);
  //       setSelected(newSelected);
  //       return;
  //     }
  //     setSelected([]);
  //   };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   const handleChangeDense = (event) => {
  //     setDense(event.target.checked);
  //   };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notifications.length) : 0;

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      {/* Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          textAlign="center"
          id="draggable-dialog-title"
        >
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
            <ButtonBright
              variant="contained"
              //   color="success"
              endIcon={<CheckCircleIcon />}
            >
              Approve
            </ButtonBright>
            <ButtonDark
              variant="contained"
              //   color="secondary"
              endIcon={<HighlightOffIcon />}
            >
              Deny
            </ButtonDark>
          </Box>

          {/* Should only render when 'deny' is clicked */}
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

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
        // numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              //   numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //   onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={notifications.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 notifications.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(notifications, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClickOpen(event, row.id)}
                      //   role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.type}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 100 }}>
                        {row.carer}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 100 }}>
                        {row.patient}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 100 }}>
                        {row.notificationDate}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 100 }}>
                        {row.visitDate}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 100 }}>
                        {row.visitTime}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={notifications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* TODO adjust to switch to dark mode?? */}
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
};
