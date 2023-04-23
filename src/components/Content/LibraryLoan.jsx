import React, { useState, useEffect } from "react";
import {
  fetchLoans,
  fetchLoanPerPage,
  paidBook,
  loansFindLenght,
  editLoan,
} from "../../redux/loansSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { Table, Dropdown } from "react-bootstrap";
import {
  Button,
  Box,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  Autocomplete,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import LoadingData from "../LoadingData";

import BookFindItem from "./BookFindItem";
import UserFindItem from "./UserFindItem";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import loansStyle from "../../css/Loans.module.scss";
const LibraryLoan = () => {
  useEffect(() => {
    dispatch(fetchLoans());
  }, []);
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const loans = useSelector((state) => state.loans);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [indexPage, setIndexPage] = useState(0);
  const [firstLoading, setFirstLoading] = useState(true);

  //Filter Loans List
  const [typeFilter, setTypeFilter] = useState("title");
  const [findItem, setFindItem] = useState("");
  const handleFilter = (e) => {
    setFindItem(e.target.value);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      handleChangePage("", 1);
    }, 500);
    return () => clearTimeout(handler);
  }, [findItem, typeFilter]);
  const handleChangePage = async (event, value) => {
    const indexPage = value;
    setPage(indexPage);
    setIndexPage(value * 10 - 10);
    if (findItem === "") {
      await dispatch(fetchLoanPerPage({ indexPage: indexPage }));
    } else {
      await dispatch(
        fetchLoanPerPage({
          type: typeFilter,
          value: findItem,
          indexPage: indexPage,
        })
      );
      dispatch(
        loansFindLenght({
          type: typeFilter,
          value: findItem,
        })
      );
    }
    setFirstLoading(false);
  };

  //Edit loan
  const handleChangeDayReturn = (e) => {
    setItemEdit({ ...itemEdit, dayReturn: e.target.value });
  };
  const handleEditNote = (e) => {
    setItemEdit({ ...itemEdit, note: e.target.value });
  };
  const handleEditLoan = async () => {
    await dispatch(editLoan(itemEdit));
    handleChangePage("", page);
    setOpenAlertEdit(true);
    setOpenEdit(false);
  };

  //Show open Dialog edit loan
  const [openEdit, setOpenEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState({});
  const handleClickOpenEdit = (item) => {
    setItemEdit({ ...item });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setItemEdit({});
  };

  //Show alert edit success message
  const [openAlertEdit, setOpenAlertEdit] = useState(false);
  const handleCloseAlertEdit = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertEdit(false);
  };

  //Paid book
  const handleChangeNote = (e) => {
    setItemPaid({ ...itemPaid, note: e.target.value });
  };
  const handlePaidBook = async () => {
    await dispatch(paidBook(itemPaid));
    handleChangePage("", page);
    setOpenAlertPaid(true);
    setOpenPaid(false);
  };

  //Show open Dialog paid book
  const [openPaid, setOpenPaid] = useState(false);
  const [itemPaid, setItemPaid] = useState({});
  const handleClickOpenPaid = (item) => {
    setItemPaid({ ...item });
    setOpenPaid(true);
  };

  const handleClosePaid = () => {
    setOpenPaid(false);
    setItemPaid({});
  };

  //Show alert paid success message
  const [openAlertPaid, setOpenAlertPaid] = useState(false);
  const handleCloseAlertPaid = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertPaid(false);
  };
  console.log("loans:", loans.loanPerPage);
  return (
    <Box>
      <Box
        sx={{
          paddingX: "16px",
        }}>
        <Grid container spacing={{ md: 3 }}>
          <Grid item xs={12} md={6}>
            <BookFindItem />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserFindItem />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          paddingX: "16px",
        }}>
        {/* Search Bar */}
        <Grid container direction="row" gap={1} sx={{ marginY: "16px" }}>
          <Dropdown
            onSelect={(e) => {
              setTypeFilter(e);
            }}>
            <Dropdown.Toggle
              variant="warning"
              className="text-capitalize h-100">
              Search {typeFilter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="name"
                className={typeFilter === "name" ? "active" : ""}>
                Name
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="title"
                className={typeFilter === "title" ? "active" : ""}>
                Title
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="studentCode"
                className={typeFilter === "studentCode" ? "active" : ""}>
                Student Code
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="ISBN"
                className={typeFilter === "ISBN" ? "active" : ""}>
                ISBN
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="dayBorrow"
                className={typeFilter === "dayBorrow" ? "active" : ""}>
                Day Loan
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="dayReturn"
                className={typeFilter === "dayReturn" ? "active" : ""}>
                Day Return
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="status"
                className={typeFilter === "status" ? "active" : ""}>
                Status
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1 }}
            value={findItem}
            onChange={handleFilter}
          />
        </Grid>

        {/* Show table data */}
        {loans.isLoading === true || firstLoading === true ? (
          <LoadingData />
        ) : (
          <Box>
            {/* Show table */}
            <Box className="table-responsive-lg">
              <Table className="table table-hover ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title Book </th>
                    <th>Student Name</th>
                    <th>Day borrow </th>
                    <th>Day return </th>
                    <th>Day returned </th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans
                    ? loans.loanPerPage.map((item, index) => (
                        <tr key={item.id} className="align-middle">
                          <td>{indexPage + index + 1}</td>
                          <td className="text-capitalize">{item.title}</td>
                          <td className="text-capitalize">{item.name}</td>
                          <td className="text-capitalize">{item.dayBorrow}</td>
                          <td className="text-capitalize">{item.dayReturn}</td>
                          <td className="text-capitalize">
                            {item.dayReturned}
                          </td>
                          <td className={`text-capitalize `}>
                            <Typography
                              component={"span"}
                              variant={"body1"}
                              className={`${
                                item.status === "done" ? loansStyle.done : ""
                              } ${
                                item.status === "expired"
                                  ? loansStyle.expired
                                  : ""
                              } ${
                                item.status === "unpaid"
                                  ? loansStyle.unpaid
                                  : ""
                              }`}>
                              {item.status}
                            </Typography>
                          </td>
                          <td className="text-capitalize">{item.amount}</td>
                          <td className="text-capitalize">{item.note}</td>
                          <td>
                            {cookies.role === "admin" ||
                            cookies.role === "librarian" ? (
                              <Box>
                                {item.status !== "done" ? (
                                  <>
                                    <Tooltip title="Edit Loan" arrow>
                                      <IconButton
                                        color="secondary"
                                        onClick={() => {
                                          handleClickOpenEdit(item);
                                        }}>
                                        <EditIcon />
                                      </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Paid Book" arrow>
                                      <IconButton
                                        color="error"
                                        onClick={() => {
                                          handleClickOpenPaid(item);
                                        }}>
                                        <RotateLeftIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                ) : (
                                  ""
                                )}
                              </Box>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </Table>
            </Box>
            <Pagination
              count={
                findItem === ""
                  ? Math.ceil(loans.loansList.length / 10)
                  : Math.ceil(loans.loansFindLenght.length / 10)
              }
              page={page}
              onChange={handleChangePage}
              className="d-flex justify-content-end my-2"
            />
          </Box>
        )}

        {/* Show Dialog and Alert Edit loan*/}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit loan</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                fullWidth
                label="Extend Day Return"
                type="date"
                margin="dense"
                onChange={handleChangeDayReturn}
                defaultValue={itemEdit.dayReturn}
                inputProps={{
                  min: itemEdit.dayReturn,
                }}></TextField>
              <TextField
                fullWidth
                label="Note"
                margin="dense"
                value={itemEdit.note}
                onChange={handleEditNote}></TextField>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button fullWidth variant="contained" onClick={handleEditLoan}>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openAlertEdit}
          autoHideDuration={3000}
          onClose={handleCloseAlertEdit}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert
            onClose={handleCloseAlertEdit}
            severity="success"
            sx={{ width: "100%" }}>
            Edit loan success!
          </Alert>
        </Snackbar>

        {/* Show Dialog and Alert Paid Book */}
        <Dialog open={openPaid} onClose={handleClosePaid}>
          <DialogTitle>Confirm Paid Book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                fullWidth
                label="Note"
                margin="dense"
                value={itemPaid.note}
                onChange={handleChangeNote}></TextField>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button fullWidth variant="contained" onClick={handlePaidBook}>
              Paid
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openAlertPaid}
          autoHideDuration={3000}
          onClose={handleCloseAlertPaid}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert
            onClose={handleCloseAlertPaid}
            severity="success"
            sx={{ width: "100%" }}>
            Paid book success!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LibraryLoan;
