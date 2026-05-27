import React from "react";
import "./General.css";
import { Link } from "react-router-dom";

function General() {
  return (
    <div className="general-container" id="general-container">
      <ul className="nab-container">
        <li className="main-nab-container">
          <Link className="front-nab" to="/setting">
            General Setting
          </Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab" to="/ErrorText">About OPD</Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab" to="/pathhade">About Pathology</Link>
        </li>
         <li className="main-nab-container">
          <Link className="front-nab" to="/Exp/Acc">About Account & Expenses</Link>
        </li>
      </ul>
    </div>
  );
}

export default General;