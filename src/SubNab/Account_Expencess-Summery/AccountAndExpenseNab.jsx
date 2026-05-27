import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../Login/Dashboard';

function AccountAndExpenseNav() {
  return (
    <>
      <Dashboard />

      <section>
        <div className="sun-heading-container Custom-CSS">
          <ul className="Sub-heading">
            <li className="sub-navigation ml-10">
              <Link to="/change/it">
                About Daily & Monthly Expanses
              </Link>
            </li>

            <li className="sub-navigation">
              <Link to="/Daily_paymet/Book">
                All Transaction Summery
              </Link>
            </li>
            
          </ul>
        </div>
      </section>
    </>
  );
}

export default AccountAndExpenseNav;