/* eslint-disable no-unused-vars */
/** @format */

import idl from "../../utils/idl.json"
import {LAMPORTS_PER_SOL, SystemProgram, Transaction} from "@solana/web3.js";
import { AnchorProvider, Program} from "@coral-xyz/anchor"
import { useDisclosure } from "@mantine/hooks";
import {useContext, useEffect, useState } from "react";
import {
	useConnection,
	useWallet,
  } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { CustomWalletContext } from "../contexts/WalletContext.jsx";
import Accounts from "../../services/Accounts.js";


export default function useConnectWallet(){
    const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const {walletAddress,addWalletAddress,setUser,setGlobalPubKey,globalPubKey} = useContext(CustomWalletContext)
	const [isOpened, setIsOpened] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const { connection } = useConnection();

    const getProvider = () => {
        const provider = new AnchorProvider(
            connection,
            window.solana,
            {}
        );
        return provider;
    };
	const {wallet} = useWallet()
    const provider = getProvider()
    const programId = new PublicKey("AtyoiYTYnCx9DKrvkjQHBkQ8xaScgKQrq3395LfdEex3")
    const program = new Program(idl,programId,provider)

    const createAccount = async(pubKey)=>{
        const res =  await program.methods.initialize()
            .accounts({
                authority : provider.wallet,
                userProfile : pubKey,
                systemProgram : programId,
            })
            .rpc();
        console.log(res)
    }
    const connectWallet = async () => {
		const { solana } = window;
		try {
			setLoading(true);
			// const [profilePda, profileBump ] = findProgramAddressSync(
			// 				[utf8.encode("USER_STATE"), publicKey.toBuffer()],
			// 				program.programId
			// 			);
			if (solana) {
				const response = await solana.connect();
				const pubKey = response.publicKey.toString()
				setGlobalPubKey(pubKey)
				const res = await Accounts.addAccount({
					name: "Godrice",
					test: "null",
					avatar: "null",
					email: "godriceonuwa@gmail.com",
					pubKey,
					date: "today",
				},pubKey);
                // await createAccount(pubKey)
				console.log(res)
				if(res.status === "success"){
					addWalletAddress(response.publicKey.toString());
					setUser({
						name: "Godrice",
						test: "null",
						avatar: "null",
						email: "godriceonuwa@gmail.com",
						pubKey,
						date: "today",
					})
				}else{
					alert("Sorry could not connect to servers at the moment please try again another time");
				}
				close();
			} else {
				alert("Please Install Solana's Phantom Wallet");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

    const disconnectWallet = async () => {
		const { solana } = window;
		try {
			setLoading(true);
			if (solana) {
				await solana.disconnect();
				addWalletAddress("");
			} else {
				alert("Please Install Solana's Phantom Wallet");
			}
		} catch (err) {
			console.log(err);
            alert("Sorry could not connect to wallett try again later")
		} finally {
			setLoading(false);
		}
	};
	const {publicKey,sendTransaction} = useWallet()

	async function payWithWallet(reciever,amount){
		const {solana} = window
		if(solana){
			try {
				const transaction = new Transaction();
			const {blockhash} = await connection.getLatestBlockhash()
			const transferInstruction = SystemProgram.transfer({
				fromPubkey:new PublicKey(walletAddress),
				toPubkey:reciever,
				lamports:LAMPORTS_PER_SOL * amount,
			})
			transaction.recentBlockhash = blockhash
			console.log(globalPubKey)
			transaction.feePayer = globalPubKey
			transaction.add(transferInstruction)
			// console.log(solana.signAndSendTransaction)
			const sig = await solana.signAndSendTransaction(transaction)
			console.log(sig)
			} catch (error) {
				console.log(error)
			}
			// console.log(sig)
		}
	}
    return {
        modal,
        loading,
        walletAddress,
		payWithWallet,
        isOpened,
        disconnectWallet,
        connectWallet,
        opened,
        open,
        setIsOpened,
        showModal: () => {
            setModal((modal) => !modal);
        }
    }
}