import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidHide, BiShowAlt } from "react-icons/bi";
import "./Login.css";


import logo from "/src/assets/plus4.webp";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isNameValid = useMemo(() => name.match(/abc/i) !== null, [name]);
    const isPasswordValid = password.length >= 3;
    const isFormValid = isNameValid && isPasswordValid;

    // Time & Date
    const [time, setTime] = useState("");
    const [day, setDay] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).slice(0, 8));
            setDay(now.toLocaleDateString('bn-BD', { weekday: 'long' }));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="login-section">

            {/* Background Image */}
            <div className="overlay"></div>

            {/* Header - Time & Day */}
            <div className="text-center p-4 md:p-6 relative z-10">
                <p className="font-extrabold text-6xl md:text-7xl lg:text-8xl text-blue-600 tracking-tight">
                    {day} {time}
                </p>
            </div>



            {/* Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-6 relative z-10">
                <div className="form-box">
                    <h2 className="text-center text-3xl p-2 font-[700]">Login Your Account</h2>
                    <p className="text-center text-gray-700 mb-6">
                        Your Health, Our Priority
                    </p>

                    <input
                        className="login-input"
                        type="text"
                        placeholder="Enter User ID"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="password-box relative flex items-center">
                        <input
                            className="login-input pr-12"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="absolute right-4 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                        </span>
                    </div>

                    <button
                        disabled={!isFormValid}
                        className={`w-[96%] py-3 mt-4 text-lg font-semibold rounded-xl transition-all duration-300 ${isFormValid ? "active-btn" : "disabled-btn"
                            }`}
                        onClick={() => navigate("/dashboard")}
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* Hospital Logo + Marquee */}
            <div className="flex items-center justify-center gap-3 p-2 relative z-10">
                <img id="logo-size" src={logo} alt="Hospital Care" />
                <div className="marquee">
                    <p className="text-white font-extrabold">
                        Dream Hospital, Tangail — Your Health, Our Priority 🩺
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;