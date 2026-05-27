import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../../Login/Dashboard'
function Pathhade() {
  return (
    <>
      <Dashboard></Dashboard>
      <section>
        <div className='sun-heading-container Custom-CSS'>
          <ul className='Sub-heading'>
            <li className='sub-navigation'>
              <Link to="/GeneralSettings">General Setting of Pathology
              </Link>
            </li>

            <li className="sub-navigation">
              <Link to="/diagnosis"> About Diagnosis </Link>
            </li>

            <li className='sub-navigation'>
              <Link to='/Pathology_Report'>
                Pathology Report
                </Link>
            </li>
            <li className='sub-navigation'>
              <Link to='/Report_Part'>
                About All Report
              </Link>
            </li>
            <li className='sub-navigation'>
              <Link to='/Reagppood'>About Reagents
              </Link>
              </li>
          </ul>
        </div>
      </section>
      </>
  )
}

export default Pathhade
