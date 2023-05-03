import React, { useState } from "react";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";

const Admin = () => {

    const [stakerKey, setStakerKey] = useState("");
    const [borrowerKey, setBorrowerKey] = useState("");
    // const [stakerData, setStakerData] = useState("");
    const [disabled1, setDisabled1] = useState(true);
    const [disabled2, setDisabled2] = useState(true);

    const { contract } = useContract(process.env.REACT_APP_CONTRACT);
    const { mutateAsync: addInterestToBorrower, isLoading: isLoading1 } = useContractWrite(contract, "addInterestToBorrower");
    const { mutateAsync: distributeInterest, isLoading:isLoading2 } = useContractWrite(contract, "distributeInterest");
    const { mutateAsync: liquidate, isLoading: isLoading3 } = useContractWrite(contract, "liquidate");

    const [ message, setMessage ] = useState("");

    const handleDistributeInterest = async () => {
        setMessage("Processing your transaction...");
        try {
            const data = await distributeInterest();
            console.info("contract call successs", data);
            setMessage("Successfully distributed interest to all stakers");
          } catch (err) {
            console.error("contract call failure", err);
            setMessage("Transaction failed" + err);
          }
        }

    const handleAddInterstToBorrower = async () => {
        setMessage("Processing your transaction...");
        try {
            const data = await addInterestToBorrower();
            console.info("contract call successs", data);
            setMessage("Successfully added Interest to Borrower");
          } catch (err) {
            console.error("contract call failure", err);
            setMessage("Transaction failed" + err);
          }
    }

    const handleLiquidate = async () => {
        setMessage("Processing your transaction...");
        try {
            const data = await liquidate();
            console.info("contract call successs", data);
            setMessage("Successfully Liquidated")
          } catch (err) {
            console.error("contract call failure", err);
                setMessage("Transaction failed" + err);
          }
    }

    const handleLogOut = () => {
        <Link to={'/'} />
    }

    const handleStakerKeyChange = (e) => {
        setStakerKey(e.target.value)
        setDisabled1(!e.target.value)
        
    }

    const handleBorrowerKeyChange = (e) => {
        setBorrowerKey(e.target.value)
        setDisabled2(!e.target.value)
    }

    // const getStakerData = async (stakerKey) => {
    //     const { data: stakerData } = await useContractRead(contract, "stakerData", stakerKey);
    //     setStakerData(stakerData);
    // }

    // const handleGetStakerData = () => {
    //     getStakerData(stakerKey);
    // }



    return (
        <div>
            <div className="Navbar">
                <div>
                    <Link to="/admin">
                        <img src={logo} className="logo" alt="logo"/>
                    </Link>
                </div>
                <div>
                    <h6>Deployed Contract: {process.env.REACT_APP_CONTRACT}</h6>
                    <h6>USDC Contract: {process.env.REACT_APP_USDCCONTRACT}</h6>
                </div>
            </div>
            <hr className="hr"></hr>
            <div className="admindashboard">
                <div className="functions">
                    <h3>Admin Function buttons</h3>
                    <button className="adminbutton" onClick={handleDistributeInterest}>
                        Distribute Interest to Stakers
                    </button>
                    <button className="adminbutton" onClick={handleAddInterstToBorrower}>
                        Add Interst to Borrower
                    </button>
                    <button className="adminbutton" onClick={handleLiquidate}>
                        Liquidate Unpaid Loans
                    </button>
                    <Link to={'/'}>
                        <button className="dashbutton">
                            Log Out
                        </button>   
                    </Link>              
                    {message && <p>{message}</p>}
                </div>
                
                <hr className="hr_verticle"/>
                <div className="admindetails">
                    <h3>Admin Details dashboard</h3>
                    <div className="adminform">
                        <h5>Staker's data:</h5>
                        <label>Staker Key</label>
                        <input
                        type="text"
                        className="input_text"
                        onChange={handleStakerKeyChange}
                        value={stakerKey} 
                        />
                        <button className="dashbutton" disabled={disabled1} >Get Data</button>
                    </div>
                    <hr />
                    <div className="adminform">
                        <h5>Borrower's Data:</h5>
                        <label>Borrower Key</label>
                        <input
                            type="text"
                            className="input_text"
                            onChange={handleBorrowerKeyChange}
                            value={borrowerKey} 
                        />
                        <button className="dashbutton" disabled={disabled2}>Get Data</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Admin;