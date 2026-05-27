import React from 'react'
import { Link } from 'react-router-dom'
import Setting from '../../Setting'

function Doc_Appoinment() {
    return (
        <>
        <Setting/>
            <section id='doc-appoin' className='Diagnosis-Container'>
                <div>
                    <ul className='Diagnosis_list'>
                        <li className="report-list">
                            <Link className="report-title" to="/Doc_Appoinment">
                                Doctors Appointment
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Doc_Appoinment">
                                Doctors Appointment Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Doc_Appoinment">
                                Doctors Appointment SMS Resend
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Doc_Appoinment