import React, { useContext, useState, useEffect } from "react";
import { EthContext } from "../context/Ethstate";
import { Link } from 'react-router-dom';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Navbar from "../Components/Navbar";
import { ethers } from "ethers";
import defiAbi from "../abis/defi-abi.json";

const Dashboard = () => {

    const { account, signer, provider } = useContext(EthContext)
    const myContract = new ethers.Contract(process.env.REACT_APP_CONTRACT, defiAbi, signer, provider);
    const [data, setData] = useState(null);
    const [message, setMessage] = useState("");

    const [stakingAmount, setStakingAmount] = useState("");
    const [stakingDate, setStakingDate] = useState("");
    const [collectedInterest, setCollectedInterest] = useState("");

    const [borrowedAmt, setBorrowedAmt] = useState("");
    const [collateralAmt, setCollateralAmt] = useState("");
    const [dueInterest, setDueInterest] = useState("");
    const [borrowedDate, setBorrowedDate] = useState("");
    const [ethRate, setEthRate] = useState("");
    const [totalDue, setTotalDue] = useState("");

    useEffect (() => {
        if (message) {
         const timer = setTimeout(() => {
            setMessage("");
         }, 5000);
         return () => clearTimeout(timer);
        }
    }, [message]);


    const getStakerData = async(account) => {
        const  data = await myContract.stakerData(account);
        return data;
    }

    useEffect (() => {
        getStakerData(account).then((data) => {
            const [stakingAmount, stakingDate, collectedInterest] = data;
            setStakingAmount(stakingAmount / 10**6);
            const date = new Date((stakingDate.toNumber() * 1000))
            setStakingDate(date.toLocaleDateString());
            setCollectedInterest(collectedInterest.toString());
        });
    })

    const getBorrowerData = async(account) => {
        const data = await myContract.borrowerData(account);
        return data;
    }

    useEffect (() => {
        getBorrowerData(account).then((data) => {
            const [borrowedAmt, collateralAmt, borrowedDate, dueInterest, ethRate] = data;
            setBorrowedAmt(borrowedAmt / 10**6);
            setCollateralAmt(collateralAmt /10**18);
            const date = new Date((borrowedDate.toNumber() * 1000))
            setBorrowedDate(date.toLocaleDateString());
            setDueInterest(dueInterest / 10**6);
            setTotalDue(Number(borrowedAmt) + Number(dueInterest));
            setEthRate(ethRate.toString());
        })
    })

    const claimInterest = async () => {
        setMessage("Processing Transaction. Verify when prompted.")
        try {
            const data = await myContract.claimInterest();
            console.log("Contract Call Success", data);
            setMessage("Successfully calimed Interest")
        } catch (err) {
            console.log("Contract Call Failure", err);
            setMessage("Transaction Failed");
        }
    }
    
    const handleWithdraw = async() => {
        setMessage("Processing your transaction. Verify the transcation when prompted.")
        try{
            const data = await myContract.withdrawUSDC();
            console.log("contract call success", data)
            setMessage("Tranasction Successful");
        } catch (err) {
            console.log("contract call failure", err);
            setMessage("Transaction Failed. Try Again.")
        }
    }

    const handlePayInterest = async (dueInterest) => {
        try {
            const data = await myContract.payInterest(dueInterest);
            console.log("contract call success", data);
        } catch (err) {
            console.log("contract call failure", err)
        }
    }

    const handleRepayUSDC = async (repayAmount) => {
        try {
            const data = await myContract.repayUSDC(repayAmount);
            console.log("contract call success", data);
        } catch (err) {
            console.log("contract call failure", err)
        }
    }

    return(
        <div className="App">
            <Navbar />
            <hr className="hr"/>
            <div className="Dashboard">
                {!account?
                <div>
                    <h3> Seems like you have not connected your wallet.</h3>
                    <h2> Connect your meta mask wallet to view your dashboard.</h2>
                </div>
                :
                <div>
                    <div>
                        <h4>Connected Wallet:</h4> {account} 
                    </div>
                    <div className="dashboard_main">
                        <div className="staked_part">
                            <h2> Your Assets </h2>
                            <hr/>
                            <table className="table">
                                <tbody>
                                    <tr>
                                    <td>Current interest Rate</td>
                                    <td>2%</td>
                                    {/* {isLoadingInterestRate ? <td>...</td> : <td>{`${displayRate}%`|| "x"}</td>} */}
                                    </tr>
                                    <tr>                            
                                    <td>Total Deposited USDC</td>
                                    {stakingAmount === null ? <td>...</td> : <td>{stakingAmount} USDC</td>}
                                    <td>
                                        <Link to="/stake">
                                            <button className="dashbutton">Stake More Assets</button>
                                        </Link>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Total Interest Accured</td>
                                    {collectedInterest === null ? <td>...</td> : <td>{collectedInterest} USDC</td>}
                                    <td>
                                        <button className="dashbutton" onClick={() => claimInterest()}>Withdraw Interest</button>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Withdrawable Assets</td>
                                    {stakingAmount === null || collectedInterest === null ? 
                                    <td>...</td> : 
                                    <td>{Number(stakingAmount) + Number(collectedInterest)} USDC</td>}                         
                                    <td>
                                        <button className="dashbutton" onClick={() => handleWithdraw()}>Withdraw USDC</button>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Transaction Initiation Date</td>
                                    {stakingDate === null ? 
                                    <td>...</td> : 
                                    <td>{stakingDate}</td>} 
                                    </tr>
                                </tbody>
                                </table>
                                {message && <p>{message}</p>}
                            <hr/>
                        </div>
                        <hr className="hr_verticle"/>
                        <div className="loaned_part">
                            <h2> Your Loans</h2>
                            <hr/>                        
                            <table className="table">
                                <tbody>
                                    <tr>
                                    <td>Current interest Rate</td>
                                    <td>7.5%</td>
                                    </tr>
                                    <tr>                            
                                    <td>Total Deposited Collateral</td>
                                    {collateralAmt === null ? <td>...</td> : <td>{collateralAmt} ETH</td>}
                                    <td>
                                        <Link to="/stake">
                                            <button className="dashbutton">Increase Collateral</button>
                                        </Link>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Total Loan Taken out</td>
                                    {borrowedAmt === null ? <td>...</td> : <td>{borrowedAmt} USDC</td>}
                                    <td>
                                        <Link to="/borrow">
                                        <button className="dashbutton">Take more loans</button>
                                        </Link>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Due Interest</td>
                                    {dueInterest === null ? <td>...</td> : <td>{dueInterest}</td>}
                                    <td>
                                        <button className="dashbutton" onClick={() => handlePayInterest(dueInterest)}>Pay Now</button>
                                    </td>
                                    </tr>
                                    <tr>                               
                                    <td>Total Due</td>
                                    {borrowedAmt === null || dueInterest === null ?
                                    <td>...</td> :
                                    <td>{Number(borrowedAmt) + Number(dueInterest)} USDC</td>}
                                    <td>
                                        <button className="dashbutton" onClick={() => handleRepayUSDC(totalDue)}>Pay Now</button>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Rate OF ETH</td>
                                    {ethRate === null ? <td>...</td> : <td>{ethRate}</td>}
                                    </tr>
                                    <tr>                                
                                    <td>Transaction Initiation Date</td>
                                    {borrowedDate === null ? 
                                    <td>...</td> : 
                                    <td>{borrowedDate}</td>} 
                                    </tr>
                                </tbody>
                                </table>

                            <hr/>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Dashboard;