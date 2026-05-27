import React from 'react'
import './Setting.css'
import Dashboard from '../../Login/Dashboard'
import { Link } from 'react-router-dom'
function Setting() {
    return (
        <>
            {/* Root page of Admin , General Setting And others  */}
            <Dashboard></Dashboard>
            <section className='Custom-CSS'>
                <div className='sun-heading-container'>
                    <ul className='Sub-heading'>
                        <li className='sub-navigation ml-10'>
                            <Link to="/Admin"> Admin Panel
                            </Link>
                        </li>
                        <li className='sub-navigation'>
                            <Link to="/Doctor">
                                General Setting
                            </Link>
                        </li>
                        <li className='sub-navigation'>
                            <Link to="/Doc_Appoinment">
                                Doctor Appointment
                            </Link>
                        </li>
                        <li className='sub-navigation'>
                            <Link to="/MySms">
                                About SMS and Service charge
                            </Link>
                        </li>
                       
                    </ul>
                </div>
            </section>


        </>
    )
}

export default Setting
