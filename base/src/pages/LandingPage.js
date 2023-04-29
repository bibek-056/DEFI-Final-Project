import React, { useState } from "react";
import logo from "../../src/assets/logo.png";
import { Link } from "react-router-dom";
import Banner from "../Components/Banner";
import Belt from "../Components/Belt";

const LandingPage = () => {

    const[email, setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[disabled, setDisabled] = useState(true);
    const[message, setMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setDisabled(!e.target.value || !password);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setDisabled(!e.target.value || !email);
    }

    return(
        <div>
            <div className="Navbar">
                <Link to="home">
                    <img src={logo} className="logo" alt="logo"/>
                </Link>
                <Link to={"home"}>
                    <button className="dashbutton">
                        CustomerLogin
                    </button>
                </Link>
            </div>
            <div className="formcontainer">
                <div className="adminform">
                    <label>Admin Email:</label>
                    <input
                        type="text"
                        className="input_text"
                        onChange={handleEmailChange}
                        value={email} 
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        className="input_text"
                        onChange={handlePasswordChange}
                        value={password}
                    />

                    <Link to={{ 
                            pathname: "/admin",
                            }}>
                            <button className="dashbutton" disabled={disabled}>Admin Login</button>
                    </Link>
                    {message && <p> {message} </p>}
            </div>
        </div>
        <hr className="hr" />
        {/* <Banner /> */}
        </div>

    )
}

export default LandingPage;