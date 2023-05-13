import React, { useContext, useState, useEffect } from "react";
import { EthContext } from "../context/Ethstate";
import Navbar from "../Components/Navbar";
import { ethers } from "ethers";
import axios from "axios";
import usdcAbi from "../abis/usdc-abi.json";

const Transfer = () => {

    const { metamaskConnect, account, signer, provider } = useContext(EthContext)

    const usdcContract = new ethers.Contract(process.env.REACT_APP_CONTRACT, usdcAbi, signer, provider )

    const [amount, setAmount] = useState("");
    const [transferAmt, setTransferAmt] = useState("");
    const [recipient, setRecipient] = useState("");
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [gas, setGas] = useState('Select Gas');
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState("");

    useEffect (() => {
        if (message) {
          const timer = setTimeout(() => {
            setMessage("");
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [message]);
    
      useEffect (() => {
        setTransferAmt(amount * 10**6)
      }, [amount]);

    // const callTransferFunction = async (recipient, transferAmt) => {
    //     setMessage("Approved. Tranferring Asset..")
    //     try {
    //         const overrides = {
    //             gasLimit: 50000
    //           };
    //         const data = await usdcContract.transfer(recipient, transferAmt, overrides);
    //         console.log("transaction hash", data.hash);
    //         const response = await axios.get(`https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${data.hash}&api_key=K4UMDB695592ZHIKWIY1WQY1A21ERJWV4H`);
    //         const { status } = response.data.result;
    //         if (status === '1') {
    //             setMessage("Transaction Successful");
    //         } else {
    //             setMessage("couldnot complete the tranasction.")
    //         }
            
    //     } catch (err) {
    //         console.log("transaction failed", err);
    //         setMessage("Transaction Failed.")
    //     }
    // }

    // const callSenderApprove  = async (recipient, transferAmt) => {
    //     setMessage("Approving transaction. Verify the transaction when prompted.")
    //     try {
    //         const overrides = {
    //             gasLimit: 50000
    //         };
    //       const data = await usdcContract.approve(recipient, transferAmt, overrides);
    //       console.log("contract call successs", data);
    //       //actual transfer function
    //       await callTransferFunction(recipient, transferAmt);
    //     } catch (err) {
    //       console.error("contract call failure", err);
    //       setMessage("Couldnot approve your transaction");
    //     }
    //   }

    const transferEth = async(signer, recipient, amount) => {
        const tx = {
            to: recipient,
            value: ethers.utils.parseEther(amount)
        }
        try {
            const txReceipt = await signer.sendTransaction(tx);
            console.log("Transaction Completed", txReceipt);
            setMessage("Successfully Transferred.")
        } catch(err) {
            console.loh("Transaction Failed", err);
            setMessage("Couldnot Transfer.")
        }
    }

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
        setDisabled(!e.target.value || !amount || !gas || !termsAgreed);
    };
    
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setDisabled(!e.target.value || !recipient || !gas || !termsAgreed);
    };    

    const handleGasChange = (e) => {
        setGas(e.target.value);
        setDisabled(!e.target.value || !recipient || !amount || !termsAgreed);
    };
    
    const handleTermsAgreedChange = (e) => {
        setTermsAgreed(e.target.checked);
        setDisabled(!e.target.checked || !recipient || !amount || !gas);
    };

    return(
        <div>
            <Navbar/>
            <hr className="hr"/>
        <div className="borrowform">
            <div className="guidelines">
                <h1>TRANSFER</h1>
                <ul>
                    <li>Transfer funds from your account to any other address easily and securely.</li>
                    <li>High gas fee equals faster transactions.</li>
                    <li>Gas fees are deducted automaticallys from your wallet when the transfer transaction is performed.</li>
                    <li>Gas fees can be dynamic depending on the amount of transaction traffic.</li>
                </ul>

            </div>
            <hr className="hr_verticle"/>
            <div className="form">
                { (!account)?
                <div>
                    <div>
                        <h3> Seems like you have not connected your wallet.</h3>
                        <h2> Connect your meta mask wallet to transfer funds.</h2>
                    </div>
                    <button className="btn_family" onClick={(e)=>{metamaskConnect(e)}}>Connect your metamask wallet now.</button>
                </div>
                :
                <div>
                    <h4>Connected Wallet:</h4> {account} 
                    <hr/>
                    <div>
                        <label>Recepient's Wallet Address</label>
                        <input 
                            className="input_text" 
                            type="string"
                            value={recipient}
                            onChange={handleRecipientChange}
                        />
                    </div>
                    <div>
                        <label>Amount to Transfer</label>
                        <input 
                            className="input_text" 
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </div>
                    <select className="input_text" aria-label="Default select example" onChange={handleGasChange}>
                        <option defaultValue>Select Gas</option>
                        <option value="1">High Gas</option>
                        <option value="2">Medium Gas</option>
                        <option value="3">Low Gas</option>
                    </select>
                    <p>If you donot select any gas, the most suitable gas will be automatically selected for you.</p>
                    <div className="form-check">
                        <input className="input_checkbox" type="checkbox" value="" id="flexCheckDefault" onChange={handleTermsAgreedChange}/>
                        <label>
                            <p className="concent">I agree to the terms and conditions.</p>
                        </label>
                    </div>
                    <button className="dashbutton" onClick={() => transferEth(signer, recipient, amount) } disabled={disabled}>Transfer Now</button>
                </div>
                }
                {message && <p>{message}</p>}
            </div>
        </div>
    </div>
    )
}

export default Transfer;