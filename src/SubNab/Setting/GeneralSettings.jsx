import React from 'react'
import { Link } from 'react-router-dom'
import Pathhade from '../../Pathology/Path_Root/Pathhade'

export default function GeneralSettings() {
  return (
    <>
   <Pathhade/>
      <section id='Pathology-GeneralSetting' className='Diagnosis-Container'>
        <div>
          <ul className='Diagnosis_list'>
            <li className="report-list">
              <Link className="report-title" to="/testName-Cost">
                Diagnosis Test Details
              </Link>
            </li>
            <li className="report-list">
              <Link className="report-title" to="/GeneralSettings">
                Diagnosis Category Details
              </Link>
            </li>
            <li className="report-list">
              <Link className="report-title" to="/GeneralSettings">
                Diagnosis Soecimen Details
              </Link>
            </li>
            <li className="report-list">
              <Link className="report-title" to="/GeneralSettings">
                Diagnosis Department Details
              </Link>
            </li>
            </ul>
        </div>
      </section>
    </>
  )
}
