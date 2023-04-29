import React, { useState } from "react";
import { EthContext } from "../context/Ethstate";
import { useContext } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Navbar from "../Components/Navbar";

const Stake = () => {
  const { metamaskConnect, account } = useContext(EthContext);
  const { contract } = useContract(process.env.REACT_APP_CONTRACT);
  const { usdcContract } = useContract(process.env.REACT_APP_USDCCONTRACT);
  const { mutateAsync: depositUSDCEarnInterest, isLoading: contractLoading } = useContractWrite(contract, "depositUSDCEarnInterest");
  const { mutateAsync: approve, isLoading: usdcContractLoading } = useContractWrite(usdcContract, "approve");
  const [amount, setAmount] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setDisabled(!e.target.value || !termsAgreed);
  };

  const handleTermsAgreedChange = (e) => {
    setTermsAgreed(e.target.checked);
    setDisabled(!e.target.checked || !amount);
  };

  const callSenderApprove  = async (account, amount) => {
    try {
      const data = await approve({ args: [account, amount] });
      console.info("contract call successs", data);
      //actual transfer function
      await handleStakeNow( amount );
    } catch (err) {
      console.error("contract call failure", err);
      setMessage("Couldnot approve your transaction");
    }
  }

  const handleStakeNow = async ( amount ) => {
    try {
      const data = await depositUSDCEarnInterest({ args: [amount] });
      console.info("contract call successs", data);
      setMessage("Transaction Successful");
    } catch (err) {
      console.error("contract call failure", err);
      setMessage("Transaction Failed");
    }
  }

  return (
    <div>
      <Navbar />
      <hr className="hr"></hr>
      <div className="borrowform">
        <div className="guidelines">
          <h1>STAKE</h1>
          <ul>
            <li>Stake USDT and earn interest.</li>
            <li>Stake rate is 7.5%.</li>
            <li>
              Rates are dynamic and subject to change according to amount of
              ethereum staked in the pool.
            </li>
            <li>Interest is paid automatically every week in ethereum account.</li>
          </ul>
        </div>
        <hr className="hr_verticle" />
        <div className="form">
          {!account ? (
            <div>
              <div>
                <h3> Seems like you have not connected your wallet.</h3>
                <h2>
                  {" "}
                  Connect your meta mask wallet to deposit your assets and earn interest.
                </h2>
              </div>
              <button className="btn_family" onClick={(e) => {
                metamaskConnect(e)
              }}>Connect your metamask wallet now.</button>
            </div>
          ) : (
            <div>
              <h4>Connected Wallet:</h4> {account}
              <hr />
              <div>
                <label>Amount to Stake</label>
                <input
                  className="input_text"
                  type="number"
                  placeholder="Amount in USD"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              <div className="form-check">
                <input className="input_checkbox" type="checkbox" value="" id="flexCheckDefault" onChange={handleTermsAgreedChange}/>
                <label>
                  <p className="concent">I agree to the terms and conditions.</p>
                </label>
              </div>
              <button className="dashbutton" onClick={() => callSenderApprove( account, amount ) } disabled={disabled}>
                Stake Now
              </button>
              {message && <p>{message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stake;
