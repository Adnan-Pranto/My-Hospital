import React from "react";
import "./General.css";
import { Link } from "react-router-dom";

function General() {
  return (
    <div className=" general-container Custom-CSS">
      <ul className="nab-container">

        <li className="main-nab-container">
          <Link className="front-nab" to="/setting">
            General Setting
          </Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab">About OPD</Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab" to="/pathhade">About Pathology</Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab">About Indoor</Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab">About Personal</Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab">About Expenses</Link>
        </li>

        <li className="main-nab-container">
          <Link className="front-nab">About Account</Link>
        </li>

      </ul>
    </div>
  );
}

export default General;