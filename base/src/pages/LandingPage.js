import React, { useContext, useEffect, useState } from "react";
import logo from "../../src/assets/logo.png";
import { Link } from "react-router-dom";


const LandingPage = () => {

    // const { handleAdminLogin, valid } = useContext(EthContext);

    const[email, setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[disabled, setDisabled] = useState(true);
    const[message, setMessage] = useState("");
    const[admin, setAdmin] = useState(false);

    useEffect (() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message])

    // useEffect (() => {
    //     if (valid) {
    //         setAdmin(valid);
    //     }
    // }, [valid]);

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
                <Link to="/">
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
                    {/* <form onSubmit = {handleSubmit}> */}
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
                    { email === "admin" && password === "admin" ? (
                    <Link to={{ 
                        pathname: "/admin",
                        search: `?email=${email}&password=${password}`
                        }}>
                        <button className="dashbutton" disabled={disabled}>Admin Login</button>
                    </Link>
                    ) : (
                    <button className="dashbutton" disabled={disabled} onClick={() => setMessage("incorrect email or password")}>
                        Admin Login
                    </button>
                    )}
                    {message && <p>{message}</p>}
            </div>
        </div>
        <hr className="hr" />
        </div>

    )
}  

export default LandingPage;