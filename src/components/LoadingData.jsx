import React from "react";
import loadingStyle from "../css/LoadingData.module.scss";
const LoadingData = () => {
  return (
    <div className={`${loadingStyle.loadFrame}`}>
      <div className={`${loadingStyle.loadItem}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingData;
