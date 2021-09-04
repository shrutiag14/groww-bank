import React from "react";
import "../styles/Appbar.css";
import image from "../static/Groww-Logo.png";
const Appbar = () => {
  return (
    <nav className="appbar">
      <img src={image} height="50" width="160" alt="logo" className="logo"/>
    </nav>
  );
};

export default Appbar;
