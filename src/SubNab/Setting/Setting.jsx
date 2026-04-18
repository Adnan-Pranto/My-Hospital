import React from 'react'
import './Setting.css'
import Dashboard from '../../Login/Dashboard'
function Setting() {
    return (
        <>
        <Dashboard></Dashboard>
        <section className='Custom-CSS'>
            <div className='sun-heading-container'>
                <ul className='Sub-heading'>
                    <li className='sub-navigation ml-10'>Admin Panel</li>
                    <li className='sub-navigation'>General Setting</li>
                    <li className='sub-navigation'>Doctor Appointment</li>
                    <li className='sub-navigation'>About SMS</li>
                </ul>
            </div>
        </section>
        
     
        </>
    )
}

export default Setting
