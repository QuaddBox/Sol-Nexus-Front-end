/* eslint-disable no-unused-vars */
/** @format */

import idl from "../../utils/idl.json"
import {Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction,clusterApiUrl} from "@solana/web3.js";
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
import EventService from "../../services/EventService.js";
import { DateTime } from "luxon";


export default function useConnectWallet(){
    const [modal, setModal] = useState(false);
	const [loadingConn,setLoadingConn] = useState(false);
	const [loading, setLoading] = useState(false);
	const {walletAddress,addWalletAddress,setUser,setGlobalPubKey,globalPubKey} = useContext(CustomWalletContext)
	const [isOpened, setIsOpened] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const { connection } = useConnection();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

    const getProvider = () => {
		if ("solana" in window) {
			const provider = window.solana;
			if (!provider.isPhantom) {
				alert("Please Install Solana's Phantom Wallet")
				throw new Error("Please Install Solana's Phantom Wallet");
			}
			return provider;
		}
    };
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
		try {
			setLoading(true);
			const provider = getProvider()
			const response = await provider.connect();
			const pubKey = response.publicKey.toString()
			setGlobalPubKey(pubKey)
			const res = await Accounts.addAccount({
				name,
				test: "null",
				avatar: "null",
				email,
				pubKey,
				date: DateTime.now().toString(),
			},pubKey);
			console.log(res)
			if(res.status !== "success"){
				alert("Sorry could not connect to servers at the moment please try again another time");
				throw new Error(res.errror_message);
			}
			addWalletAddress(response.publicKey.toString());
				setUser({
					name,
					test: "null",
					avatar: "null",
					email,
					pubKey,
					date: "DateTime.now().toString()",
			})
			close();
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

    const disconnectWallet = async () => {
		try {
			setLoading(true);
			const provider = getProvider();
			await provider.disconnect();
		} catch (err) {
			console.log(err);
            alert("Sorry could not connect to wallett try again later")
		} finally {
			setLoading(false);
		}
	};
	const checkExistingUser = async () => {
            try {
				setLoadingConn(true)
				const provider = getProvider();
				console.log("phatom is connected");
				const response = await provider.connect({
					onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
				});
				const pubKey = response.publicKey.toString()
				const res = await Accounts.findUser(pubKey)
				// console.log(res)
				const isExisting = res.status === "success"
				if(!isExisting) {
					open()
				}else{
					connectWallet()
				}
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingConn(false)
            }
	};

	async function payWithWallet(reciever,amount,data,eventId){
		console.log(data);
		// const network = "https://api.devnet.solana.com";
		const myConn  = new Connection(clusterApiUrl("devnet"),"confirmed")
			try {
				const provider = getProvider();
				const transaction = new Transaction();
				const {blockhash} = await myConn.getLatestBlockhash()
				const transferInstruction = SystemProgram.transfer({
					fromPubkey:new PublicKey(walletAddress),
					toPubkey:reciever,
					lamports:LAMPORTS_PER_SOL * parseInt(amount),
				})

				transaction.add(transferInstruction)
				transaction.recentBlockhash = blockhash
				transaction.feePayer = new PublicKey(walletAddress)

				const signed = await provider.signTransaction(transaction)
				const txID = await connection.sendRawTransaction(signed.serialize())
				await connection.confirmTransaction({
					signature:txID
				})
				console.log(txID)
				const res = await EventService.buyTicket({...data,txID}
					,eventId)
				if(res.status === "success"){
					alert("You have successfully bought a ticket")
					window.location.assign("/ticket")
				}else{
					alert("Sorry could not make payment please try again later")
				}
			} catch (error) {
				console.log(error)
				alert("Sorry could not make payment please try again later")
			}
	}
    return {
        modal,
        loading,
        walletAddress,
		payWithWallet,
		name,
		setName,
		email,
		setEmail,
		checkExistingUser,
        isOpened,
        disconnectWallet,
        connectWallet,
        opened,
        open,
		loadingConn,
        setIsOpened,
        showModal: () => {
            setModal((modal) => !modal);
        }
    }
}