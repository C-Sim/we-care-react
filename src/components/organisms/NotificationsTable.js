import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { AppContext } from "../../context/AppProvider";

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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import visuallyHidden from "@mui/utils/visuallyHidden";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  UPDATE_APPOINTMENT,
  UPDATE_READ,
  PATIENT_APPROVE,
} from "../../graphql/mutations";

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

// const modalData = {
//   notification: notification.id,
//   notificationType: notification.__typename,
//   appointmentId: notification.appointmentId || ["N/A"],
//   accountType: notification.accountType,
//   patient: notification.appointmentId.patient || ["N/A"],
//   notificationDate: notification.notificationDate,
//   visitDate: notification.appointmentDate || ["N/A"],
//   visitTime: notification.appointmentDate || ["N/A"],
//   notificationText: notification.notificationText || ["N/A"],
// };

//template modal data for now
// const modalRows = [
//   createData("Patient:", "Charlie Dean"),
//   createData("Submitted:", "18/08/22"),
//   createData("Visit Date:", "18/08/22"),
//   createData("Visit Time:", "12:00"),
//   createData(
//     "Comment:",
//     "It will be difficult to get across town from my last appointment in time"
//   ),
// ];

const createNotification = (
  notificationId,
  notificationType,
  accountType,
  username,
  notificationDate,
  visitDate,
  visitTime,
  isRead
) => {
  return {
    notificationId,
    notificationType,
    accountType,
    username,
    notificationDate,
    visitDate,
    visitTime,
    isRead,
  };
};

// Dummy data to show what table should look like
// const Notifications = [
//   createNotification(
//     "1",
//     "Shift Change",
//     "Carer",
//     "Alice Bond",
//     "18/08/22",
//     "25/08/22",
//     "12:00",
//     "true"
//   ),
//   createNotification(
//     "2",
//     "New Patient",
//     "Patient",
//     "Abe Zephaniah",
//     "18/08/22",
//     "N/A",
//     "N/A",
//     "true"
//   ),
//   createNotification(
//     "3",
//     "Shift Change",
//     "Carer",
//     "Alan Bates",
//     "18/08/22",
//     "25/08/22",
//     "15:00",
//     "false"
//   ),
//   createNotification(
//     "4",
//     "New Patient",
//     "Patient",
//     "Abe Zephaniah",
//     "19/08/22",
//     "N/A",
//     "N/A",
//     "true"
//   ),
//   createNotification(
//     "5",
//     "Shift Change",
//     "Carer",
//     "Alice Bond",
//     "18/08/22",
//     "25/08/22",
//     "18:00",
//     "false"
//   ),
//   createNotification(
//     "6",
//     "Patient Amend",
//     "Patient",
//     "Abe Zephaniah",
//     "20/08/22",
//     "N/A",
//     "N/A",
//     "true"
//   ),
// ];

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
    id: "notificationType",
    numeric: false,
    disablePadding: true,
    label: "Type",
  },
  {
    id: "accountType",
    numeric: false,
    disablePadding: true,
    label: "User Type",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Name",
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
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export const NotificationsTable = ({ notifications }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("notificationDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [isReadStatus, setIsReadStatus] = useState(false);
  const [selectedNotificationId, setNotificationId] = useState("");
  // create state for holding query data

  const [updateRead] = useMutation(UPDATE_READ);

  //   useEffect(() => {
  //     console.log(notifications);
  //   }, [notifications]);

  const context = useContext(AppContext);
  const userAccount = context.user.accountType;

  const notificationData = notifications.map((notification) => ({
    notificationId: notification.id,
    notificationType: notification.notificationType,
    accountType: notification.senderId.accountType,
    username: `${notification.senderId.firstName} ${notification.senderId.lastName}`,
    notificationDate: notification.notificationDate,
    visitDate: notification.appointmentDate || ["N/A"],
    visitTime: notification.appointmentDate || ["N/A"],
    isRead: notification.isRead,
    senderId: notification.senderId.id,
    senderEmail: notification.senderId.email,
    receiverId: notification.receiverId,
    appointmentId: notification.appointmentId || ["N/A"],
    patient: notification.patientUsername || ["N/A"],
    notificationText: notification.notificationText || ["N/A"],
  }));

  const [savedNotifications, setNotifications] = useState(notificationData);

  console.log(notifications);

  const Notifications = savedNotifications.map((notification) => {
    return createNotification(
      notification.notificationId,
      notification.notificationType,
      notification.accountType,
      notification.username,
      notification.notificationDate,
      notification.visitDate,
      notification.visitTime,
      notification.isRead
    );
  });

  console.log(savedNotifications, notificationData);
  console.log(Notifications);

  const modalRowData = notificationData.find(
    (notification) => notification.notificationId === selectedNotificationId
  );

  const modalRows = [
    createData("Patient:", modalRowData?.patient),
    createData("Submitted:", modalRowData?.notificationDate),
    createData("Visit Date:", modalRowData?.visitDate),
    createData("Visit Time:", modalRowData?.visitTime),
    createData("Comment:", modalRowData?.notificationText),
  ];

  // update read status

  const handleUpdateRead = async (id) => {
    try {
      await updateRead({
        variables: { notificationId: id },
      });

      console.log(id);
      notifications = notifications.map((notification) => {
        if (notification.id === id) {
          return { ...notification, isRead: true };
        }
        console.log(notification);

        return notification;
      });

      setIsReadStatus(true);

      console.log(notifications);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickOpen = (event, id) => {
    event.preventDefault();

    setNotificationId(id);

    console.log(selectedNotificationId);
    console.log(id);

    handleUpdateRead(id);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const approvePatient = useMutation(PATIENT_APPROVE);
  const updateAppointment = useMutation(UPDATE_APPOINTMENT);

  const handleApproval = async (
    event,
    notificationId,
    notificationType,
    senderId,
    appointmentId
  ) => {
    // if notificationType === "New patient review"
    try {
      await approvePatient({ variables: { senderId } });

      //   success(true);
    } catch (err) {
      console.error(err);
    }

    // if notificationType === "Carer change"
    const trigger = "carerChange";

    try {
      await updateAppointment({
        variables: {
          appointmentId,
          trigger,
          //   appointmentUpdateInput: { carerId, start, end },
        },
      });

      //   success(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDenial = async (event) => {
    // regardless of type
    //
    // if (senderId.accountType === "carer")
    // send notification to inform carer that request has been denied - use sendNotification resolver
    // send email to inform patient that request has been denied - use emailJS
    //
    // if (senderId.accountType === "patient") {
    // emailjs
    //   .sendForm(
    //     "service_doq4yxc",
    //     "template_3zqd709",
    //     form.current,
    //     "ulS302XN5UlvLfEvu"
    //   )
    //   .then(
    //     (result) => {
    //       handleOpenModal();
    //     },
    //     (error) => {
    //       setEmailError(true);
    //     }
    //   )};
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Notifications.length) : 0;

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
              {modalRows.map((row) => (
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

          {userAccount === "supervisor" && (
            <Box sx={{ m: 1, display: "flex", justifyContent: "space-around" }}>
              {" "}
              <Button
                variant="contained"
                color="success"
                type="submit"
                endIcon={<CheckCircleIcon />}
                onClick={handleApproval}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                type="submit"
                endIcon={<HighlightOffIcon />}
                onClick={handleDenial}
              >
                Deny
              </Button>
            </Box>
          )}

          <DialogActions>
            <Button autoFocus onClick={handleClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </TableContainer>
      </Dialog>

      {Notifications.length === 0 && (
        <Typography align="center" sx={{ pb: 2, color: "#00b0ff" }}>
          You have no notifications.
        </Typography>
      )}

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(Notifications, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  //   const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClickOpen(event, row.notificationId)
                      }
                      tabIndex={-1}
                      key={row.notificationId}
                      value={row.notificationId}
                      sx={{
                        backgroundColor: row.isRead ? "#eef5dbff" : "white",
                      }}
                    >
                      <TableCell
                        component="th"
                        id={row.id}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.notificationType}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 100 }}>
                        {row.accountType}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 100 }}>
                        {row.username}
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
                    height: 53 * emptyRows,
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
          count={Notifications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
