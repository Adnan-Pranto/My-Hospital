import React from 'react'
import { Link } from 'react-router-dom'
import Pathhade from '../Path_Root/Pathhade'
function Pathology_Report() {
    return (
        <>
            <Pathhade />
            <section id='report-formate-1234' className='Diagnosis-Container '>
                <div>
                    <ul className='Diagnosis_list'>
                        <li className="report-list">
                            <Link className="report-title" to="/Test-ParameterDetails">
                                Diagnosis Test Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Diagnosis PopUp Result Setting
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/testing">
                                Diagnosis Report Generate Formate One
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Report-Formate">
                                Diagnosis Report Generate Formate Two
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Diagnosis Report Generate Formate Three
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Diagnosis Report Generate Formate Four
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                                Diagnosis Report Generate For U.S.G
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Pathology_Report">
                              Part of Diagnosis Test Details For U.S.G
                            </Link>
                        </li>

                    </ul>
                </div>
            </section>
        </>
    )
}

export default Pathology_Report