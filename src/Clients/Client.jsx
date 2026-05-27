import { IoSearch } from "react-icons/io5";
import './Client.css'
import { useState, useEffect } from "react";
import logo from "../assets/icon-of-hospital-vector.jpg";

function Client() {

    const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB').slice(0, 8));

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-GB').slice(0, 8));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className='Custom-CSS client-software-name border-1 rounded-2xl border-b-mauve-200'>
            {/* logo & Client name section  */}
            <div className='flex items-center'>
                <img id='logo-size' src={logo} alt="Hospital Care" />
                <div className="marquee" >
                    <p className="text-green-600 font-extrabold">🚑 Dream Hospital, Shabaliya, Tangail — Welcome to our service 🩺</p>
                </div>

            </div>
            {/* SHow date & time Section */}
            <div>
                <input className="font-extrabold text-xl text-rose-500"
                    type="date"
                    defaultValue={new Date().toLocaleDateString("en-CA")}
                />
                <input className="font-extrabold text-xl text-rose-500" type="time" value={time} readOnly />
            </div>
            {/* Search option  */}
            <div className='flex p-2 items-center justify-center' id='search-here'>
                <input
                    type="search"
                    className=" w-72 p-1"
                    placeholder='What you want to search?'
                />
                <IoSearch className="mr-3 w-10" />
            </div>


        </section>
    );
}

export default Client;