/* eslint-disable no-unused-vars */
/** @format */

import idl from "../../utils/idl.json"
import {Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction} from "@solana/web3.js";
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
        const provider = new AnchorProvider(
            connection,
            window.solana,
            {}
        );
        return provider;
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
					name,
					test: "null",
					avatar: "null",
					email,
					pubKey,
					date: DateTime.now().toString(),
				},pubKey);
                // await createAccount(pubKey)
				console.log(res)
				if(res.status === "success"){
					addWalletAddress(response.publicKey.toString());
					setUser({
						name,
						test: "null",
						avatar: "null",
						email,
						pubKey,
						date: "DateTime.now().toString()",
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
	const checkExistingUser = async () => {
		const { solana } = window;
            try {
				setLoadingConn(true)
                if (solana) {
                    if (solana.isPhantom) {
                        console.log("phatom is connected");
                        const response = await solana.connect({
                            onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
                        });
                        const pubKey = response.publicKey.toString()
						const res = await Accounts.findUser(pubKey)
						console.log(res)
						const isExisting = res.status === "success"
						if(!isExisting) {
							open()
						}else{
							connectWallet()
						}
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingConn(false)
            }
	};

	async function payWithWallet(reciever,amount,data,eventId){
		const network = "https://api.devnet.solana.com";
		const myConn  = new Connection(network)
		const {solana} = window
		if(solana){
			try {
				const transaction = new Transaction();
				const {blockhash} = await myConn.getLatestBlockhash()
				const transferInstruction = SystemProgram.transfer({
					fromPubkey:new PublicKey(walletAddress),
					toPubkey:reciever,
					lamports:LAMPORTS_PER_SOL * amount,
				})
				transaction.recentBlockhash = blockhash
				transaction.feePayer = new PublicKey(walletAddress)
	
				transaction.add(transferInstruction)
				const sig = await solana.signAndSendTransaction(transaction)
				await myConn.confirmTransaction(sig)
				console.log(sig)
				const res = await EventService.buyTicket(data,eventId)
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
			// console.log(sig)
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
		name,
		setName,
		email,
		setEmail,
        showModal: () => {
            setModal((modal) => !modal);
        }
    }
}