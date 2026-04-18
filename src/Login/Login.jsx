import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { BiSolidHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
function Login() {
    // passwoard section 
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordValid = password.length >= 3;
    const isNameValid = name.match('abc');
const isFormValid = isPasswordValid && isNameValid;
    // time & date section 
    const [time, setTime] = useState(
        new Date().toLocaleTimeString('bn-BD').slice(0, 8)
    );

    const [day, setDay] = useState(
        new Date().toLocaleDateString('bn-BD', { weekday: 'long' })
    );

    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date();

            setTime(now.toLocaleTimeString('bn-BD').slice(0, 8));
            setDay(now.toLocaleDateString('bn-BD', { weekday: 'long' }));

        }, 1000);

        return () => clearInterval(id);
    }, []);
    return (
        <section className="Custom-CSS">
            <div className="text-center p-4 ">
                <img src="" alt="" />
                <p className="font-extrabold text-8xl text-rose-500" >{day} {time}</p>
            </div>
            <div className="container">

                <div className="form-box">
                    <h2 className="text-center text-3xl p-2 font-[700]">Login Your Account</h2>
                    <p className="text-center text-gray-700">To sign in Our App Follow this</p>
                    <input className="login-input"
                        type="name"
                        placeholder="Enter User ID"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* password section */}
                    <div className="password-box relative flex items-center">
                        <input className="login-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="absolute right-2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                        </span>
                    </div>

                    <button
  disabled={!isFormValid}
  className={isFormValid ? "active-btn" : "disabled-btn"}
  onClick={() => navigate("/dashboard")}
>
  Submit
</button>
                </div>
            </div>
        </section>



    );
}

export default Login;