import React, { useState, useEffect } from "react";
import {
  fetchUserPerPage,
  deleteUser,
  usersFindLenght,
} from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import membersStyle from "../../css/Member.module.scss";
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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LoadingData from "../LoadingData";
const Members = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [indexPage, setIndexPage] = useState(0);
  const [firstLoading, setFirstLoading] = useState(true);
  //Filter
  const [typeFilter, setTypeFilter] = useState("name");
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
      dispatch(fetchUserPerPage({ indexPage: indexPage }));
    } else {
      dispatch(
        fetchUserPerPage({
          type: typeFilter,
          value: findItem,
          indexPage: indexPage,
        })
      );
      dispatch(
        usersFindLenght({
          type: typeFilter,
          value: findItem,
        })
      );
    }
    setFirstLoading(false);
  };

  const [confirmEdit, setConfirmEdit] = useState(false);
  const [profileEdit, setProfileEdit] = useState({});
  const closeDialogEdit = () => {
    setConfirmEdit(false);
  };
  const handleEditUser = (item) => {
    setProfileEdit({ ...item });
    setConfirmEdit(true);
  };
  const navigateEditUser = () => {
    navigate("/index/profile", { state: profileEdit });
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleDeleteUser = (item) => {
    setIdDelete(item.id);
    setConfirmDelete(true);
  };
  const closeDialogDelete = () => {
    setConfirmDelete(false);
  };
  const delUser = () => {
    setConfirmDelete(false);
    dispatch(deleteUser(idDelete));
    setFindItem("");
    handleChangePage("", 1);
  };

  const [confirmAddUser, setConfirmAddUser] = useState(false);
  const closeDialogAddUser = () => {
    setConfirmAddUser(false);
  };
  const navigateAddUser = () => {
    navigate("/index/adduser");
  };
  const handleAddUser = () => {
    setConfirmAddUser(true);
  };
  return (
    <Box
      sx={{
        paddingX: "16px",
      }}>
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
              eventKey="role"
              className={typeFilter === "role" ? "active" : ""}>
              Role
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="username"
              className={typeFilter === "username" ? "active" : ""}>
              Username
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="schoolCode"
              className={typeFilter === "schoolCode" ? "active" : ""}>
              School Code
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="studentCode"
              className={typeFilter === "studentCode" ? "active" : ""}>
              Student Code
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
        <Tooltip title="Add User" arrow onClick={handleAddUser}>
          <IconButton color="primary">
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={confirmAddUser} onClose={closeDialogAddUser}>
          <DialogTitle>Do you want to add more user</DialogTitle>
          <DialogContent>
            <DialogContentText>Confirm please!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialogAddUser}>Disagree</Button>
            <Button
              onClick={navigateAddUser}
              autoFocus
              variant="outlined"
              color="error">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      {users.isLoading === true || firstLoading === true ? (
        <LoadingData />
      ) : (
        <Box className="table-responsive-lg">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Birthday</th>
                <th>Email</th>
                <th>Role</th>
                <th>School Code</th>
                <th>Student Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                ? users.userPerPage.map((item, index) => (
                    <tr key={item.id} className="align-middle">
                      <td>{indexPage + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={item.avatar}
                            alt=""
                            className={`rounded-circle ${membersStyle.avatar}`}
                          />
                          <p className="m-0 text-capitalize">{item.name}</p>
                        </div>
                      </td>
                      <td className="text-capitalize">{item.birthday}</td>
                      <td className="text-capitalize">{item.email}</td>
                      <td className="text-capitalize">{item.role}</td>
                      <td className="text-capitalize">{item.schoolCode}</td>
                      <td className="text-capitalize">{item.studentCode}</td>
                      <td>
                        {cookies.role === "admin" ? (
                          <Box>
                            <Tooltip
                              title="Edit User"
                              arrow
                              onClick={() => handleEditUser(item)}>
                              <IconButton color="secondary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Delete User"
                              arrow
                              onClick={() => {
                                handleDeleteUser(item);
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
                ? Math.ceil(users.usersList.length / 10)
                : Math.ceil(users.usersFindLenght.length / 10)
            }
            page={page}
            onChange={handleChangePage}
            className="d-flex justify-content-end my-2"
          />
          <Dialog open={confirmEdit} onClose={closeDialogEdit}>
            <DialogTitle>Do you want to edit this user?</DialogTitle>
            <DialogContent>
              <DialogContentText>Confirm please!</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialogEdit}>Disagree</Button>
              <Button
                onClick={navigateEditUser}
                autoFocus
                variant="outlined"
                color="error">
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={confirmDelete} onClose={closeDialogDelete}>
            <DialogTitle>Do you want to delete this user?</DialogTitle>
            <DialogContent>
              <DialogContentText>Confirm please!</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialogDelete}>Disagree</Button>
              <Button
                onClick={delUser}
                autoFocus
                variant="outlined"
                color="error">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default Members;
