import React from 'react'
import "../Diagonsis_Root/Diagonsis.css"
import Pathhade from '../Pathhade'
import { Link } from 'react-router-dom'
// import Test from './Test/Test'
function Diagnosis() {

  return (
    <>
      <Pathhade />
      <section id='my-animation' className='Diagnosis-Container Custom-CSS'>
        <div>
          <ul className='Diagnosis_list'>
            <li className="report-list">
              <Link className="report-title" to="/pathhade/diagnosis/test">
                D. Diagnosis Test Sale
              </Link>
            </li>
            <li className='report-list'>
              <Link className="report-title" to="/SearchAndEdit/Test">
                Search of Diagnosis Test Sale
              </Link>
              </li>
            <li className='report-list'>
              <Link className="report-title" to=" ">
               Search of Diagnosis Test Sale On Operator
              </Link>
              </li>
            <li className='report-list'>
              <Link className="report-title" to="/Due-Collection">
               D. Diagnosis Due Collection
              </Link>
              </li>
              <li className='report-list'>
              <Link className="report-title" to="/ErrorText">
              testttttttttttttt
              </Link>
              </li>
            <li className='report-list'><a className='report-title'>Barcode Generate For Tube</a></li>
            
            <li className='report-list'><a className='report-title'>Search of Diagnosis Due Collection</a></li>
            <li className='report-list'><a className='report-title'>Diagnosis Data Set Recovery</a></li>
            <li className='report-list'><a className='report-title'>Sale Diagnosis Test Return</a></li>
            <li className='report-list'><a className='report-title'>Cancel of Diagnosis Test Sale</a> </li>
            <li className='report-list'><a className='report-title'>Sale Diagnosis Test Return</a></li>
            <li className='report-list'><a className='report-title'>Search of Sale Diagnosis Test Return</a> </li>
            <li className='report-list'><a className='report-title'>Diagnosis Reference Verify</a></li>
            <li className='report-list'><a className='report-title'>Diagnosis Reference Fee Payment</a></li>
            <li className='report-list'><a className='report-title'>Search of Diagnosis Reference Fee Payment</a></li>
          </ul>
        </div>
      </section></>
  )
}

export default Diagnosis
