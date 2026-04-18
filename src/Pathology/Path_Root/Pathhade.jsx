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
                    <li className='sub-navigation'>General Setting of Pathology</li>
                    
                      <li className="sub-navigation">
              <Link to="/diagnosis"> About Diagnosis </Link> 
              </li>

                    <li className='sub-navigation'>Pathology Report</li>
                    <li className='sub-navigation'> About All Report</li>
                    <li className='sub-navigation'>About Reagents</li>
                </ul>
            </div>
        </section></>
  )
}

export default Pathhade
