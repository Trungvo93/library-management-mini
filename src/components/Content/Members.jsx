import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import membersStyle from "../../css/Member.module.scss";
import Table from "react-bootstrap/Table";
import { Box, Pagination } from "@mui/material";
const Members = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <Box className="table-responsive-md">
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
            ? users.usersList.map((item, index) => (
                <tr key={item.id} className="align-middle">
                  <td>{index + 1}</td>
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
                    {/* {cookies.role === "admin" ? (
                      <div className="row ">
                        <div className="col-xl-6 col-12 mb-2">
                          <button
                            className="btn btn-warning w-100 "
                            onClick={() => handleEditUser(e)}>
                            Edit
                          </button>
                        </div>
                        <div className="col-xl-6 col-12 mb-2">
                          <button
                            className="btn btn-danger w-100"
                            onClick={() => {
                              handleClickOpen(e);
                            }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
      <Pagination
        count={10}
        page={page}
        onChange={handleChangePage}
        className="d-flex justify-content-end my-2"
      />
    </Box>
  );
};

export default Members;
