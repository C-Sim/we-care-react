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
  PATIENT_APPROVE,
  UPDATE_CARER,
} from "../../graphql/supervisorMutations";
import { CARERS } from "../../graphql/supervisorQueries";
import emailjs from "@emailjs/browser";

import { UPDATE_APPOINTMENT, UPDATE_READ } from "../../graphql/mutations";

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
  const [selectedNotificationType, setNotificationType] = useState("");
  const [updatedReceivedArray, setUpdatedReceivedArray] = useState();
  const [emailError, setEmailError] = useState();

  const [notifData, setNotifData] = useState(notifications);
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [reallocateSuccess, setReallocateSuccess] = useState(false);

  //query for carers
  const {
    data: allCarersData,
    loading: allCarersLoading,
    error: allCarersError,
  } = useQuery(CARERS);
  //mutations
  const [
    updateRead,
    { data: readData, loading: readLoading, error: readError },
  ] = useMutation(UPDATE_READ, {
    onCompleted: () => {
      setIsReadStatus(true);
      setNotifData(readData.updateIsReadStatus);
    },
  });

  const [
    updateApprovedStatus,
    { data: approveData, loading: approveLoading, error: approveError },
  ] = useMutation(PATIENT_APPROVE, {
    onCompleted: () => {
      setApproveSuccess(true);
    },
  });

  const [
    updateCarer,
    {
      data: updateCarerData,
      loading: updateCarerLoading,
      error: updateCarerError,
    },
  ] = useMutation(UPDATE_CARER, {
    onCompleted: () => {

      setReallocateSuccess(true);
    },
  });

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

  const handleUpdateRead = (id) => {
    updateRead({
      variables: { notificationId: id },
    });
  };

  const handleClickOpen = (event, id, type) => {
    event.preventDefault();

    setNotificationId(id);


    setNotificationType(type);


    handleUpdateRead(id);

    setOpen(true);
  };

  const handleClose = () => {
    setApproveSuccess(false);
    setReallocateSuccess(false);
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

  const handleProcessNotification = async (notification, action) => {
    if (notification.notificationType === "New patient review") {
      updateApprovedStatus({
        variables: {
          userId: notification.senderId,
        },
      });
    }
    if (notification.notificationType === "Schedule change") {
      const carersArrayToFilter = allCarersData.carers;

      const possibleCarers = carersArrayToFilter.filter(
        (i) => i.userId.id !== notification.senderId
      );

      const carerId = possibleCarers[0].userId.id;

      updateCarer({
        variables: {
          appointmentId: notification.appointmentId,
          trigger: "carerChange",
          appointmentUpdateInput: {
            carerId: carerId,
          },
        },
      });
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Notifications.length) : 0;

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
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

          {!approveSuccess &&
            selectedNotificationType === "New patient review" && (
              <Box
                sx={{ m: 1, display: "flex", justifyContent: "space-around" }}
              >
                {" "}
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  endIcon={<CheckCircleIcon />}
                  onClick={() => {
                    handleProcessNotification(modalRowData, "APPROVE");
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  endIcon={<HighlightOffIcon />}
                  onClick={() => {
                    handleProcessNotification(modalRowData, "DENY");
                  }}
                >
                  Deny
                </Button>
              </Box>
            )}
          {approveSuccess && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "green" }}
              align="center"
            >
              Patient approved!
            </Typography>
          )}

          {!reallocateSuccess &&
            selectedNotificationType === "Schedule change" && (
              <Box
                sx={{ m: 1, display: "flex", justifyContent: "space-around" }}
              >
                {" "}
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  endIcon={<CheckCircleIcon />}
                  onClick={() => {
                    handleProcessNotification(modalRowData, "APPROVE");
                  }}
                >
                  Reallocate
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  endIcon={<HighlightOffIcon />}
                  onClick={() => {
                    handleProcessNotification(modalRowData, "DENY");
                  }}
                >
                  Deny
                </Button>
              </Box>
            )}
          {reallocateSuccess && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "green" }}
              align="center"
            >
              Appointment successfully reallocated!
            </Typography>
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
                        handleClickOpen(
                          event,
                          row.notificationId,
                          row.notificationType
                        )
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
