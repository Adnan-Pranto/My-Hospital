import React from 'react'
import Pathhade from '../Path_Root/Pathhade'
import { Link } from 'react-router-dom'
function Report_Part() {
    return (
        <>
            <Pathhade />
            <section id='patient-report' className='Diagnosis-Container'>
                <div>
                    <ul className='Diagnosis_list'>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Patient Contact Number
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Dioctor Wise Patient Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                               All Dioctor Patient Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                All Dioctor's Total Patient Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                               Selected Day Wise Total Diagnosis Test
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                               Select Diagnosis Test Day Wise Total Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Deprrtment Wise Test Sales Summery
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Sub Catagory Wise Test Sales Summery
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Selected Day Wise Details of Due Collection
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Selected Day Wise Details Of Test & Id
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Doctor Wise PC Details
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Report_Part