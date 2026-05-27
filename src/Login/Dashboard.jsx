import React from "react";
import { Outlet } from "react-router-dom";
import Client from "../Clients/Client";
import Footer from "../Footer/Footer";
import General from "../General/General";
import DisplayImg from "../General/DisplayImg";

// import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-bg">
      <Client />
      <General />

      <Outlet />

      <DisplayImg />
      <Footer />
    </div>
  );
}

export default Dashboard;