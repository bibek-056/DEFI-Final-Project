import React, { useContext, useEffect } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { useState } from 'react';
import defiAbi from "../abis/defi-abi.json"
import { EthContext } from '../context/Ethstate';

const Banner = () => {
    // const checkBalance = process.env.REACT_APP_CONTRACT
    const { metamaskConnect,account, signer, provider} = useContext(EthContext)
    const myContract = new ethers.Contract(process.env.REACT_APP_CONTRACT, defiAbi, signer, provider);
    const [totalInterest, setTotalInterest] = useState("");
    const [totalStakedAmount, setTotalStakedAmount] = useState("");

    useEffect (() => {
        getDetails();
    })
    
    const getDetails = async() => {
        try {
            const totalInterest = await myContract.viewTotalCollectedInterest();
            setTotalInterest(totalInterest / 10**6);
            const totalStakedAmount = await myContract.viewTotalStakedAmount();
            setTotalStakedAmount(totalStakedAmount / 10**6);
         } catch (err) {
            setTotalInterest("");
            setTotalStakedAmount("");
         }
    }
    return (
    <div>
        {/* <Navbar /> */}
        <div className='Banner'>
            <div className='Banner-left'>
                <p className='line2'> DECENTRALIZED LIQUIDITY POOL</p>
                <p className='line3'> Earn Interest, Borrow Assets and build applications.</p>
            </div>
            <div className='Banner-right'>
                <p className='topic'>Total Deposited ETH</p>
                <p className='detail'>32,414 ETH</p>
                <hr/>
                <p className='topic'>Total Interest Accured</p>
                <div className='detail'>{!totalInterest ? <p>...</p> : <p>{ totalInterest }</p>}
                </div>
                <hr/>
                <p className='topic'>Total USDC Locked In Pool:</p>
                <div className='detail'>{!totalStakedAmount ? <p>...</p> : <p>{totalStakedAmount}</p>}</div>
            </div>
        </div>
    </div>
    )
}

export default Banner;