import React from 'react'
// import Pathhade from '../../../Pathology/Path_Root/Pathhade'
import { Link } from 'react-router-dom'
import Setting from '../Setting'

function Doctor() {
    return (
        <>
        {/* Here All Doctor Related works  */}
            <Setting /> {/* import header from settings code  */}
            <section id='doctor-details' className='Diagnosis-Container'>
                <div>
                    <ul className='Diagnosis_list'>
                        <li className="report-list">
                            <Link className="report-title" to="/Doctors-Details">
                                Doctors Details
                            </Link>
                        </li>

                        <li className='report-list'>
                            <Link className="report-title" to="/Doctor">
                                Doctor Details For Report Generate
                            </Link>
                        </li>
                        <li className='report-list'>
                            <Link className="report-title" to="/Reffer_name">
                                Marketing Officers Details
                            </Link>
                        </li>
                        <li className='report-list'>
                            <Link className="report-title" to="/Doctor">
                                Referrer/ PC Doctor Details
                            </Link>
                        </li>
                        <li className='report-list'>
                            <Link className="report-title" to="/refererinfo">
                                Referrer/ PC Doctor Details Ligality Verify
                            </Link>
                        </li>
                        <li className='report-list'>
                            <Link className="report-title" to="/Doctor">
                                Discount Autherity Details
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>

    )
}

export default Doctor