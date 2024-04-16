/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Accounts from "../../services/Accounts";
export const CustomWalletContext = createContext({
    walletAddress:null,
    loadingConnection:true,
    addWalletAddress:(address)=>{console.log(address)},
    user:null,
    globalPubKey:null,
    setGlobalPubKey:(newPubKey)=>{console.log(newPubKey)},
    setUser:(data)=>{console.log(data)}
})

export default function WalletContextProvider({children}){
    const [walletAddress,setWalletAddress] =  useState(null)
    const [globalPubKey,setGlobalPubKey] =  useState(null)
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
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
                        const response = await solana.connect();
                        const pubKey = response.publicKey.toString()
                        setGlobalPubKey(response.publicKey)
                        const res = await Accounts.findUser(pubKey)
                        // console.log("res:", res)
                        if(res.status === "success") {
                            addWalletAddress(pubKey);
                            setUser(res.data)
                            // console.log("public key", response.publicKey.toString());
                        }
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
        <CustomWalletContext.Provider value={{
            walletAddress,
            addWalletAddress,
            loadingConnection:loading,
            globalPubKey,
            setGlobalPubKey,
            user,
            setUser
            }}>
        {children}
        </CustomWalletContext.Provider>
    )
}