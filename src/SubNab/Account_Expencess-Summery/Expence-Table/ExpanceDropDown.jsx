import React from 'react';
import { Link } from 'react-router-dom';
import Setting from '../../Setting/Setting';
import AccountAndExpenseNav from '../AccountAndExpenseNab';

function ExpanceDropDown() {
  return (
    <>
      <AccountAndExpenseNav />

      <section id="my-admin" className="Diagnosis-Container">
        <div>
          <ul className="Diagnosis_list">
            <li className="report-list">
              <Link className="report-title" to="/Details/Head">
              Expanses Head
              </Link>
            </li>
            <li className="report-list">
              <Link className="report-title" to="/Paid-Details">
              Expanses Sub Head with Paid
              </Link>
            </li>
            <li className="report-list">
              <Link className="report-title" to="/DayWise/Expanse">
              Show Expanses Day Wise
              </Link>
            </li>
            <li className="report-list">
              <Link className="report-title" to="/total/days">Show Total Expanses Multiple Days</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default ExpanceDropDown;