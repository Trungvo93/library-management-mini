import React, { useState, useEffect } from "react";
import {
  fetchLoans,
  fetchLoanPerPage,
  paidBook,
  loansFindLenght,
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
  Snackbar,
  Alert,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import LoadingData from "../LoadingData";
import EditBook from "./EditBook";
import AddBook from "./AddBook";

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
  //Filter
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
  const handleChangePage = (event, value) => {
    const indexPage = value;
    setPage(indexPage);
    setIndexPage(value * 10 - 10);
    if (findItem === "") {
      dispatch(fetchLoanPerPage({ indexPage: indexPage }));
    } else {
      dispatch(
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

  return (
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
          <Dropdown.Toggle variant="warning" className="text-capitalize h-100">
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
        <Tooltip title="Add Book" arrow>
          <IconButton color="primary">
            <LibraryAddIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      {/* Show table data */}
      {loans.isLoading === true || firstLoading === true ? (
        <LoadingData />
      ) : (
        <Box>
          <Box className="table-responsive-lg">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title Book </th>
                  <th>Student Name</th>
                  <th>Day borrow </th>
                  <th>Day return </th>
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
                        <td className="text-capitalize">{item.status}</td>
                        <td className="text-capitalize">{item.amount}</td>
                        <td className="text-capitalize">{item.note}</td>
                        <td>
                          {cookies.role === "admin" ||
                          cookies.role === "librarian" ? (
                            <Box>
                              <Tooltip title="Edit Loan" arrow>
                                <IconButton color="secondary">
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Paid Book" arrow>
                                <IconButton color="error">
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>
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
    </Box>
  );
};

export default LibraryLoan;
