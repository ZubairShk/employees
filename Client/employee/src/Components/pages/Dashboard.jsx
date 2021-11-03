import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
// import TableFooter from "/core/TableFooter ";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
// import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/styles";
import { Context } from "../../App";
import Template from "../Template/Template";
import { styled } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { deleteEmployee } from "../apis/apis";
import AlertBox from "../organism/Alertbox/AlertBox";

export const styles = makeStyles((theme) => ({
  delIcon: {
    "&:hover ": {
      color: "red",
    },
  },
  editIcon: {
    "&:hover ": {
      color: "orange",
    },
  },
  imgBtn: {
    fontSize: "0.7rem",
  },
  addBtn: {
    color: "#FFFFFF",
    background: "#008000",
    width: "10rem",
    height: "2.5rem",
  },
  table: {
    minWidth: 100,
    maxWidth: 200,
    height: "100%",
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    // <Template>
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Button
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </Button>
      <Button
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </Button>
      <Button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button>
      <Button
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </Button>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat, mat, bat, dat) {
  return { name, calories, fat, mat, bat, dat };
}

function Dashboard() {
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [employeeDetail, setEmployeeDetail] = React.useState([]);
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [keyID, setkeyID] = useState("");

  const classes = styles();
  // Avoid a layout jump when reaching the last page with empty rows.

  const { detail, gettingDetails, edit, setEdit, newId, setNewId } =
    useContext(Context);
  //   console.log("detail", detail);
  //   useEffect(() => {
  //     if (detail.data.data) {
  //       setEmployeeDetail(detail.data.data);
  //     }
  //   }, []);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    if (detail) {
      setEmployeeDetail(detail.data.data);
      // console.log(detail.data.data);
    }
  }, [detail]);

  useEffect(() => {
    gettingDetails();
    setEdit(false);
  }, []);

  const peleteProcess = (key) => {
    handleClickOpen1();
    setkeyID(key);
  };

  const onDelete = async (key) => {
    try {
      handleClose1();
      const requiestData = { id: key };
      // console.log(requiestData);
      const response = await deleteEmployee(requiestData);

      if (response.success) {
        gettingDetails();
        setAlert(true);
        setMsg("employee deleted");
        const timer = setTimeout(() => {
          setAlert(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - employeeDetail.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editUser = (key) => {
    setNewId(key);
    setEdit(true);
    history.push("/addNew");
  };

  return (
    <Template>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        marginY={5}
      >
        <Box
          marginY={3}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          width="60%"
          minWidth="50%"
          flexWrap="wrap"
          p={2}
        >
          <Typography variant={"h4"} style={{ color: "#FFFFFF" }}>
            Employees details
          </Typography>
          <Button
            onClick={() => history.push("/addNew")}
            size="small"
            startIcon={<AddIcon />}
            className={classes.addBtn}
            variant="contained"
          >
            Add New
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          style={{
            maxWidth: 1000,
            border: "2px solid #EEF1FF",
          }}
        >
          {alert && <AlertBox severity="error">{msg}</AlertBox>}
          <Table
            sx={{
              minWidth: 100,
              maxWidth: 200,
              height: "100%",
            }}
          >
            <TableHead>
              <TableRow style={{ background: "#EAF2FC" }}>
                <TableCell>
                  <Typography variant={"subtitle1"} color="inherit">
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    Email
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    Address
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={"subtitle1"} color="inherit">
                    Age
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    Date of Birth
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={"subtitle1"} color="inherit">
                    Photo
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={"subtitle1"} color="inherit">
                    Delete
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    Edit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? employeeDetail.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : employeeDetail
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.address ? row.address : ""}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.age ? row.age : ""}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.dob ? row.dob : ""}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.photo ? (
                      // <img src={row.photo} alt="profile" style={{ width: 50 }} />
                      <>
                        <Button
                          variant="text"
                          size="small"
                          color="primary"
                          onClick={handleClickOpen}
                          className={classes.imgBtn}
                        >
                          show photo
                        </Button>
                        <div>
                          <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                          >
                            <img src={row.photo} alt="profile" />
                          </Dialog>
                        </div>
                      </>
                    ) : (
                      <Typography variant={"subtitle1"} color="secondary">
                        No Photo
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <IconButton
                      className={classes.delIcon}
                      onClick={() => peleteProcess(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <IconButton
                      className={classes.editIcon}
                      onClick={() => editUser(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  style={{ overflow: "hidden" }}
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={12}
                  count={employeeDetail.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open1}
        onClose={handleClose1}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Box marginX={2}>
            <Button onClick={handleClose1}>
              <Typography>back</Typography>
            </Button>
            <Button color="error">
              <Typography color="error" onClick={() => onDelete(keyID)}>
                proceed
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Template>
  );
}

export default Dashboard;
