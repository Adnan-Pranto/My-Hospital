import React from 'react'
import { Link } from 'react-router-dom'
import Client from './Clients/Client'
import { useNavigate } from 'react-router-dom'
function ErrorFound() {
    const navigate = useNavigate();
    return (
        <>
            <Client />
            <section >
                <div className='m-34'>
                    <h1 className='text-6xl font-bold text-purple-700 p-10 text-center'>
                        😱  404..! Error 😮
                    </h1>
                    <h3 className='text-2xl font-width-700 text-center'>
                        This page currently has no data. Updates are in progress. <br />
                        You will receive the updated information once the work is completed.😊
                    </h3>
                    <button className='error-button' onClick={() => navigate(-1)}>
                        Back Previous
                    </button>
                </div>
            </section>
        </>
    )
}

export default ErrorFound