import React from "react";
import logo from "../assets/logo.png"

const Terms = () => {
    return (
        <div>
            <div className="Navbar">
                <div>
                    <img src={logo} className="logo" alt="logo"/>
                </div>
            </div>
            <div className="terms">
            <h1>TERMS AND CONDITIONS</h1>
            <hr/>
            <h5>a. Acceptance of Terms:</h5><p>By utilizing the services offered by this protocol, users hereby agree to comply with the terms and conditions outlined in the following provisions.</p>
            <h5>b. Eligibility:</h5><p>The protocol does not mandate exclusive proof of eligibility for accessing the provided services. Any user who can provide valid credentials of a MetaMask wallet will be considered eligible to avail themselves of the services. However, the protocol shall not assume liability for any damages or obligations arising from the use of these services by minors, mentally unstable individuals, or any other unauthorized users.</p>
            <h5>c. Risk and Disclosure: </h5><p>By participating in this Decentralized Financing platform, users acknowledge and understand the inherent risks involved. These risks encompass various factors, including but not limited to market volatility, potential vulnerabilities in the smart contract technology, and the possibility of financial losses arising from circumstances beyond the control of this DeFi protocol.</p>
            <h5>d. Staking and Borrowing Requirements:</h5>
                <p>i. There is no restriction on the amount of assets that can be staked into the protocol's liquidity pool, provided that the user possesses sufficient funds in their wallet. The staking process allows users to freely allocate their assets to the pool without any predetermined limitations.</p>
                <p>ii. Similarly, there is no predetermined limit on borrowing requests; however, it should be noted that loan requests will only be processed by the protocol if there are adequate USDC funds available in the pool. The protocol reserves the right to decline loan requests if there is an insufficient amount of USDC in the pool to fulfill the requested amount.</p>
                <p>iii.	Furthermore, the protocol retains the right to decline or deny its services to users without being obligated to provide specific reasons for the denial. Users acknowledge and understand that the protocol may exercise this right at its sole discretion and without any obligation to disclose the rationale behind such decisions.</p>
            <h5>e.	Interest Calculation: </h5>
                <p>i. Stakers shall be eligible to receive interest, which shall be calculated based on the proportionate value of their staked assets about the total value of assets staked in the pool. The interest distribution shall be determined by applying a predetermined interest rate to the staker's stake-to-total-stake ratio. The actual interest earned by each staker may vary based on the overall performance of the pool and the prevailing market conditions. By participating in the staking process, stakers acknowledge and accept that the interest received is subject to these proportional calculations and may be subject to fluctuations over time.</p>
                <p>ii. Pursuant to clause 'e', subclause 'i', the staker acknowledges and understands that the amount of interest received may vary for stakers with the same staked amount and interest rate. This variation is attributed to factors such as the overall performance of the staking pool, prevailing market conditions, and any other relevant considerations. The staker acknowledges and accepts that the actual interest earned may differ from other stakers due to the proportional distribution mechanism based on the individual stake-to-total-stake ratio. The staker agrees to participate in the staking process with full awareness of these potential variations in interest earnings.</p>
                <p>iii.	The duration of the installments for borrower repayments is not predetermined. However, borrowers are strongly encouraged to make regular payments towards the interest pool of the protocol as frequently as practically feasible. The interest rate for the loan is subject to change based on the protocol's policies, market fluctuations, and other pertinent factors.</p>
                <p>iv. The borrower acknowledges that the amount of USDC received in exchange for the collateral provided by them will be solely determined by the protocol and is not subject to negotiation. The borrower also acknowledges that the collateral amount may be subject to liquidation by the liquidation clauses outlined in clause (g), and the liquidation process will be conducted solely by the protocol without any negotiation.</p>
                <p>v. The stakers and borrowers acknowledge their responsibility to cover any gas fees incurred during the execution of their transactions on the platform.</p>
            <h5>f. Withdrawal and Repayment:</h5>
                <p>i. The stakers have the freedom to withdraw their staked assets, collected interest, or both at their discretion, and the protocol will not impose any restrictions or blockage on their assets under any circumstances.</p>
                <p>ii. The borrowers have the freedom to repay the borrowed assets, due interest, or both at their discretion, and the protocol will not impose any restrictions or blockage on their assets under any circumstances.</p>
                <p>iii. The stakers and borrowers acknowledge their responsibility to cover any gas fees incurred during the execution of their transactions on the platform.</p>
            <h5>g. Liquidation:</h5>
                <p>i. The collateral asset provided by the borrower may be liquidated by the protocol if the borrower fails to pay the due interest within the specified timeframe, resulting in the total due interest amount surpassing the tolerable level.</p>
                <p>ii. The term "tolerable level" referred to in clause 'g', subclause 'i' shall be interpreted as fifty percent '50%'' or half of the total borrowed amount from the protocol.</p>
                <p>iii. The protocol reserves the right to liquidate the collateral asset provided by the borrower if the overall value of the collateral falls below the total value of the loaned amount, as a result of market fluctuations in the cryptocurrency market. In such circumstances, the borrower's intention or willingness to repay the loan amount will not impede or restrict the protocol's right to liquidate the collateral assets.</p>
                <p>iv. Upon liquidation, the borrower shall be released from the obligation to repay the loan amount to the protocol, and as a result, the borrower shall relinquish their ownership rights over the collateral asset.</p>
            <h5>h. Account Security:</h5>
                <p>i. The users of the service bear the responsibility of ensuring the security of their accounts through appropriate means of their choice. The protocol shall not enforce any specific security measures for customer accounts, and the security of their MetaMask wallet will be deemed the sole protection for their profile within this protocol's web application.</p>
                <p>ii. Users are encouraged to utilize browser-level security measures to prevent unauthorized access to their accounts by third parties.</p>
                <p>iii.	The protocol shall not be held responsible for any gains or losses incurred as a result of security breaches on the customer's side.</p>
            <h5>i. Privacy Policy: </h5><p>The details of the user's accounts, transaction history, and held assets will be recorded and stored on the Ethereum blockchain. The users are solely responsible for safeguarding the privacy and security of their Private Key and other credentials associated with their MetaMask wallet. </p>
            <h5>j. Limitation of Liability:</h5>
                <p>i. The protocol shall bear responsibility for mitigating any losses resulting from preventable technical failures within the protocol, misconduct by the administration responsible for overseeing the protocol's operations, as well as any criminal or financial misconduct on the part of the protocol.</p>
                <p>ii. To hold the protocol accountable for any losses, the claimant must substantiate the allegations of misconduct by the protocol in a court of law. The burden of proof lies with the claimant to establish the protocol's wrongdoing to seek recourse.</p>
                <p>iii. The protocol shall not assume liability for any losses arising from circumstances beyond its reasonable control, including, but not limited to, market fluctuations, natural disasters, or any other external events. Users acknowledge and agree that the protocol shall not be held responsible for such losses.</p>
            <h5>k. Dispute Resolution: </h5><p>The protocol is committed to resolving any disputes through amicable discussions, arbitration, mediation, or, if necessary, legal proceedings. Users are expected to actively engage in the dispute resolution process, should it become necessary, to seek a fair resolution.</p>
            <h5>l. Amendments and updates: </h5><p>Users shall have the right to be informed about any amendments made to the policies, terms and conditions that apply to them. These updates will be communicated through the regular information channels of the protocol, which may not involve individual interactions with each user. It is the responsibility of the users to stay updated with these amendments, and the protocol shall not be held liable for any losses that may occur as a result of a user's failure to stay informed.</p>
            <h5>m. Termination:</h5>
                <p>i. The contractual relationship between the protocol and the staker will be terminated upon the staker's complete withdrawal of their assets and collected interest from the protocol.</p>
                <p>ii. The contractual relationship between the protocol and the borrower will be terminated once the borrower fully repays the loan amount and due interest to the protocol.</p>
                <p>iii. The contractual relationship between the protocol and the borrower will be terminated if the collateral assets provided by the user are liquidated by clause 'g'.</p>
                <p>iv.	This terms and conditions document will no longer be binding on any of the parties once the contractual relationship has been terminated as outlined in clause 'm', including subclauses 'i', 'ii', or 'iii'.</p>
            <h5>n. Governing law:</h5><p>The protocol and the customer mutually agree to comply with the financial and online regulations set forth by the Government of Nepal, considering such laws to be of higher authority than any conflicting laws.</p>
            </div>
            </div>
    )
}

export default Terms;