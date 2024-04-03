/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const CustomWalletContext = createContext({
    walletAddress:null,
    loadingConnection:true,
    addWalletAddress:(address)=>{console.log(address)}
})

export default function  WalletContextProvider({children}){
    const [walletAddress,setWalletAddress] =  useState(null)
    const [loading,setLoading] = useState(true)
    const addWalletAddress = (value)=>{
        setWalletAddress(value)
    }

    useEffect(()=>{
        const checkIfWalletConnected = async () => {
            const { solana } = window;
            try {
                // setLoading(true);
                if (solana) {
                    if (solana.isPhantom) {
                        console.log("phatom is connected");
                        const response = await solana.connect({
                            onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
                        });
                        addWalletAddress(response.publicKey.toString());
                        console.log("public key", response.publicKey.toString());
                        // await createAccount();
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        checkIfWalletConnected()
    },[])

    return(
        <CustomWalletContext.Provider value={{walletAddress,addWalletAddress,loadingConnection:loading}}>
        {children}
        </CustomWalletContext.Provider>
    )
}