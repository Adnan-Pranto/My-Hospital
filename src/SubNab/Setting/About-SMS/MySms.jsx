import React from 'react'
import { Link } from 'react-router-dom'
import Setting from '../Setting'
function MySms() {
    return (
        <>
            <Setting />
            <section id='about-sms' className='Diagnosis-Container'>
                <div>
                    <ul className='Diagnosis_list'>
                        <li className="report-list">
                            <Link className="report-title" to="/Payment-Method">
                                About Service charge & Payment Method
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/MySms">
                                SMS Balance
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/MySms">
                                SMS Balance Ledger
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/MySms">
                                SMS Balance Recharge
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/MySms">
                                SMS Balance Recharge Request
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/MySms">
                                SMS Send For Information
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

        </>
    )
}

export default MySms