import React from 'react'
import Pathhade from '../Path_Root/Pathhade'
import { Link } from 'react-router-dom'
function Reagent() {
    return (
        <>
            <Pathhade />
            <section id='My-Agents' className='Diagnosis-Container'>
                <div>
                    <ul className='Diagnosis_list'>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                                Reagent Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                                Reagent Stock In
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                                Reagent Unit Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                                Reagent Presentation Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                                Reagent Generic Name Details
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                               Reagent Stock Reset
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title bg-orange-200" to="/Reagppood">
                               Reagent's Abnormal USe
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                               Reagent Stock
                            </Link>
                        </li>
                        <li className="report-list">
                            <Link className="report-title" to="/Reagppood">
                               Reagent Stock Ledger
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Reagent