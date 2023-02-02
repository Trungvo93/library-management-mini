import React from "react";
import logo from "./images/logo-library.png";
const App = () => {
  console.log(logo);
  return (
    <div>
      App
      <img src={logo} alt="Logo" width="50px" />
    </div>
  );
};

export default App;
