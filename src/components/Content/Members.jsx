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
} from "@mui/material";
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

  const handleEditUser = (item) => {
    navigate("/index/profile", { state: item });
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
    handleChangePage("", 1);
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
                          <div className="row ">
                            <div className="col-xl-6 col-12 mb-2">
                              <button
                                className="btn btn-warning w-100 "
                                onClick={() => handleEditUser(item)}>
                                Edit
                              </button>
                            </div>
                            <div className="col-xl-6 col-12 mb-2">
                              <button
                                className="btn btn-danger w-100"
                                onClick={() => {
                                  handleDeleteUser(item);
                                }}>
                                Delete
                              </button>
                            </div>
                          </div>
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
            // count={Math.ceil(users.usersList.length / 10)}
            page={page}
            onChange={handleChangePage}
            className="d-flex justify-content-end my-2"
          />
          <Dialog open={confirmDelete} onClose={closeDialogDelete}>
            <DialogTitle>Do you want to delete this user?</DialogTitle>
            <DialogContent>
              <DialogContentText>Confirm please!</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialogDelete}>Disagree</Button>
              <Button onClick={delUser} autoFocus>
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
