import { createContext, useState } from "react";

export const EthContext = createContext();

export const EthProvider = (props) => {

    //Metamask connection
    const [account, setAccount] = useState(undefined);

    //function that connects to metamask 
    const metamaskConnect = async (e) => {
        e.preventDefault();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts);
        console.log('accounts', account)
    };

    const metamaskDisconnect = async (e) => {
        e.preventDefault();
        await window.ethereum.disconnect();
        setAccount(undefined);
        console.log('accounts', account)
    };

    return (
        <EthContext.Provider value={{metamaskConnect, metamaskDisconnect, account}}>
            { props.children }
        </EthContext.Provider>
    )
}