import React from "react";
import { useNavigate } from "react-router-dom";
import reloginStyle from "../css/ReLogin.module.scss";

const ReLogin = () => {
  const navigate = useNavigate();
  const handleBackLogin = () => {
    navigate("/");
  };
  return (
    <div className={`${reloginStyle.loaderPage}`}>
      <div className={`${reloginStyle.loader}`}></div>
      <div>
        <button
          className={`btn btn-secondary ${reloginStyle.backLogin}`}
          onClick={handleBackLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ReLogin;
