import React, { useState, useEffect } from "react";
import {
  fetchBooks,
  fetchBookPerPage,
  deleteBook,
  booksFindLenght,
} from "../../redux/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { Table, Dropdown } from "react-bootstrap";
import {
  Avatar,
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import LoadingData from "../LoadingData";
import EditBook from "./EditBook";
import AddBook from "./AddBook";
const Books = () => {
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const books = useSelector((state) => state.books);
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
      dispatch(fetchBookPerPage({ indexPage: indexPage }));
    } else {
      dispatch(
        fetchBookPerPage({
          type: typeFilter,
          value: findItem,
          indexPage: indexPage,
        })
      );
      dispatch(
        booksFindLenght({
          type: typeFilter,
          value: findItem,
        })
      );
    }
    setFirstLoading(false);
  };

  //Edit user
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [profileEdit, setProfileEdit] = useState({});
  const closeDialogEdit = () => {
    setConfirmEdit(false);
    handleChangePage("", page);
  };
  const handleEditBook = (item) => {
    setProfileEdit({ ...item });
    setConfirmEdit(true);
  };

  //Delete user
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleDeleteBook = (item) => {
    setIdDelete(item.id);
    setConfirmDelete(true);
  };
  const closeDialogDelete = () => {
    setConfirmDelete(false);
  };
  const delBook = () => {
    setConfirmDelete(false);
    dispatch(deleteBook(idDelete));
    setOpenAlertDelete(true);
    setFindItem("");
    handleChangePage("", 1);
  };

  //Show alert delete success message
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const handleCloseAlertDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertDelete(false);
  };
  //Add user
  const [confirmAddBook, setConfirmAddBook] = useState(false);
  const closeDialogAddBook = () => {
    setConfirmAddBook(false);
    handleChangePage("", page);
  };

  const handleAddBook = () => {
    setConfirmAddBook(true);
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
              className={typeFilter === "title" ? "active" : ""}>
              Title
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="role"
              className={typeFilter === "ISBN" ? "active" : ""}>
              ISBN
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="username"
              className={typeFilter === "author" ? "active" : ""}>
              Author
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="schoolCode"
              className={typeFilter === "publisher" ? "active" : ""}>
              Publisher
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="studentCode"
              className={typeFilter === "catagory" ? "active" : ""}>
              Category
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
        <Tooltip title="Add Book" arrow onClick={handleAddBook}>
          <IconButton color="primary">
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      {/* Show table data */}
      {books.isLoading === true || firstLoading === true ? (
        <LoadingData />
      ) : (
        <Box className="table-responsive-lg">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>ISBN</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books
                ? books.bookPerPage.map((item, index) => (
                    <tr key={item.id} className="align-middle">
                      <td>{indexPage + index + 1}</td>
                      <td className="text-capitalize">{item.title}</td>
                      <td className="text-capitalize">{item.ISBN}</td>
                      <td className="text-capitalize">{item.author}</td>
                      <td className="text-capitalize">{item.publisher}</td>
                      <td className="text-capitalize">{item.category}</td>
                      <td className="text-capitalize">{item.amount}</td>
                      <td className="text-capitalize">{item.note}</td>
                      <td className="text-capitalize">{item.update_on}</td>
                      <td>
                        {cookies.role === "admin" ? (
                          <Box>
                            <Tooltip
                              title="Edit Book"
                              arrow
                              onClick={() => handleEditBook(item)}>
                              <IconButton color="secondary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Delete Book"
                              arrow
                              onClick={() => {
                                handleDeleteBook(item);
                              }}>
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
          <Pagination
            count={
              findItem === ""
                ? Math.ceil(books.booksList.length / 10)
                : Math.ceil(books.booksFindLenght.length / 10)
            }
            page={page}
            onChange={handleChangePage}
            className="d-flex justify-content-end my-2"
          />

          {/* Add form */}
          <Dialog open={confirmAddBook}>
            <DialogTitle>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}>
                <PersonAddIcon color="primary" />
                <IconButton onClick={closeDialogAddBook}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </DialogTitle>
            <DialogContent dividers>
              <AddBook />
            </DialogContent>
          </Dialog>

          {/* Edit form */}
          <Dialog open={confirmEdit}>
            <DialogTitle>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}>
                <EditIcon color="primary" />
                <IconButton onClick={closeDialogEdit}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </DialogTitle>
            <DialogContent dividers>
              <EditBook profile={profileEdit} />
            </DialogContent>
          </Dialog>

          {/* Delete form */}
          <Dialog open={confirmDelete} onClose={closeDialogDelete}>
            <DialogTitle>Do you want to delete this book?</DialogTitle>
            <DialogContent>
              <DialogContentText>Confirm please!</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialogDelete}>Disagree</Button>
              <Button
                onClick={delBook}
                autoFocus
                variant="outlined"
                color="error">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          {/* Show alert delete success message */}
          <Snackbar
            open={openAlertDelete}
            autoHideDuration={3000}
            onClose={handleCloseAlertDelete}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <Alert
              onClose={handleCloseAlertDelete}
              severity="success"
              sx={{ width: "100%" }}>
              Delete User success!
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Box>
  );
};

export default Books;
