import React from "react";
import { useLocation } from "react-router-dom";
const EditUser = () => {
  const { state } = useLocation();
  console.log(state);
  return <div>EditUser</div>;
};

export default EditUser;
