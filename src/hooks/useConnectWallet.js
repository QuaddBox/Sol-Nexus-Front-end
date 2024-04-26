/* eslint-disable no-unused-vars */
/** @format */

import idl from "../../utils/idl.json";
import {
  Connection,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { CustomWalletContext } from "../contexts/WalletContext.jsx";
import Accounts from "../../services/Accounts.js";
import EventService from "../../services/EventService.js";
import { DateTime } from "luxon";
import Solflare from "@solflare-wallet/sdk";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes/index.js";
import { useNavigate } from "react-router-dom";

export default function useConnectWallet() {
  const [modal, setModal] = useState(false);
  const [loadingConn, setLoadingConn] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    walletAddress,
    addWalletAddress,
    setUser,
    setGlobalPubKey,
    globalPubKey,
    open,
    opened,
    close,
    isOpened2,
    setIsOpened2
  } = useContext(CustomWalletContext);
  const [isOpened, setIsOpened] = useState(false);
  
  
  const { connection } = useConnection();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    console.log(walletAddress);
  });

  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (!provider.isPhantom) {
        alert("Please Install Solana's Phantom Wallet");
        throw new Error("Please Install Solana's Phantom Wallet");
      }
      return provider;
    }
  };
  const provider = getProvider();
  const programId = new PublicKey(
    "AtyoiYTYnCx9DKrvkjQHBkQ8xaScgKQrq3395LfdEex3"
  );
  const program = new Program(idl, programId, provider);

  const createAccount = async (pubKey) => {
    const res = await program.methods
      .initialize()
      .accounts({
        authority: provider.wallet,
        userProfile: pubKey,
        systemProgram: programId,
      })
      .rpc();
    console.log(res);
  };
  const connectWallet = async () => {};

  const connectToPhantomWallet = async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      const response = await provider.connect();
      const pubKey = response.publicKey.toString();
      const res = await Accounts.findUser(pubKey);
      // console.log(res)
      const isExisting = res.status === "success";
      setGlobalPubKey(pubKey);
      addWalletAddress(pubKey);
      localStorage.setItem("wallet", "Phantom");
      if (isExisting) {
        setIsOpened2(false);
        addAccount(pubKey)
      } else {
        setIsOpened2(false);
        open();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const connectToSolflareWallet = async () => {
    const wallet = new Solflare();
    await wallet.connect();
    const pubKey = wallet.publicKey?.toString();
    console.log(wallet.isConnected);

    wallet.on("connect", () => {
      console.log("connected", pubKey);
    });

    const response = await Accounts.findUser(pubKey);
    // console.log(res)
    const isExisting = response.status === "success";
    setGlobalPubKey(pubKey);
    addWalletAddress(pubKey);
    localStorage.setItem("wallet", "Solflare");
    if (isExisting) {
      setIsOpened2(false);
      addAccount(pubKey)
    } else {
      setIsOpened2(false);
      open();
    }
  };

  const addAccount = async (pubKey) => {
    const res = await Accounts.addAccount(
      {
        name,
        test: "null",
        avatar: "null",
        email,
        pubKey,
        date: DateTime.now().toString(),
      },
      pubKey
    );
    console.log(res);
    if (res.status !== "success") {
      alert(
        "Sorry could not connect to servers at the moment please try again another time"
      );
      throw new Error(res.errror_message);
    }
    setGlobalPubKey(pubKey);
    addWalletAddress(pubKey);
    setUser({
      name,
      test: "null",
      avatar: "null",
      email,
      pubKey,
      date: "DateTime.now().toString()",
    });
  };

  const disconnectWallet = async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      await provider.disconnect();
      setGlobalPubKey("");
      addWalletAddress("");
    } catch (err) {
      console.log(err);
      alert("Sorry could not connect to wallett try again later");
    } finally {
      setLoading(false);
    }
  };
  const checkExistingUser = async () => {
    try {
      setLoadingConn(true);
      let pubKey;
      if (window.solana) {
        const provider = getProvider();
        console.log("phantom is connected");
        const response = await provider.connect({
          onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
        });
        pubKey = response.publicKey.toString();
      } else {
        alert("Please Install Solana's Solflare Wallet or Phantom Wallet");
      }
      const res = await Accounts.findUser(pubKey);
      // console.log(res)
      const isExisting = res.status === "success";
      if (!isExisting) {
        console.log(isExisting);
        open();
        // isOpened2();
        setLoadingConn(false);
      } else {
        // connectWallet();
        console.log(isExisting);
        if (window.solana) {
          connectToPhantomWallet();
        } else {
          alert("Please Install Solana's Solflare Wallet or Phantom Wallet");
        }
        setLoadingConn(false);
      }
      setLoadingConn(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingConn(false);
    }
  };

  async function payWithWallet(receiver, amount, data, eventId) {
    // const network = "https://api.devnet.solana.com";
    // let signature = "";
    const myConn = new Connection(clusterApiUrl("devnet"), "confirmed");
    try {
      const wallet = new Solflare();
      console.log(wallet.isConnected);

      if (!walletAddress) {
        alert("Please connect your wallet");
        return;
      }

      const walletType = localStorage.getItem("wallet");
      console.log(walletType)
      if (walletType == "Solflare") {
        const wallet = new Solflare({ network: "devnet" });
        await wallet.connect();
        const fromWallet = wallet.publicKey;
        const { blockhash } = await myConn.getLatestBlockhash();
        console.log(wallet.isConnected);

        let transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: fromWallet,
            toPubkey: receiver,
            lamports: LAMPORTS_PER_SOL * amount,
          })
        );
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = fromWallet;

        // await wallet.sign(transaction)
        let signature = await wallet.signAndSendTransaction(transaction);
        const res = await EventService.buyTicket(
          { ...data, signature },
          eventId
        );
        if (res.status === "success") {
          alert("You have successfully bought a ticket");
          navigate("/ticket");
        } else {
          alert("Sorry could not make payment please try again later");
        }
      } else {
        const provider = getProvider();
        const transaction = new Transaction();
        const { blockhash } = await myConn.getLatestBlockhash();
        const transferInstruction = SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: receiver,
          lamports: LAMPORTS_PER_SOL * parseInt(amount),
        });

        transaction.add(transferInstruction);
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = new PublicKey(walletAddress);
        console.log(walletAddress);

        const signed = await provider.signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        console.log(signature)
        const res = await EventService.buyTicket(
          { ...data, signature },
          eventId
        );
        if (res.status === "success") {
          alert("You have successfully bought a ticket");
          navigate("/ticket");
        } else {
          alert("Sorry could not make payment please try again later");
        }
      }

      // const provider = getProvider();
      // const transaction = new Transaction();
      // const { blockhash } = await myConn.getLatestBlockhash();
      // const transferInstruction = SystemProgram.transfer({
      //   fromPubkey: provider.publicKey,
      //   toPubkey: new PublicKey(receiver),
      //   lamports: LAMPORTS_PER_SOL * parseInt(amount),
      // });

      // transaction.add(transferInstruction);
      // transaction.recentBlockhash = blockhash;
      // transaction.feePayer = new PublicKey(walletAddress);
      // console.log(walletAddress)
      // // const wallet = new Solflare();

      // // const signed = await provider.signTransaction(transaction);
      // let signed = await provider.signTransaction(transaction);

      // const signature = await connection.sendRawTransaction(signed.serialize());

      // await connection.confirmTransaction(signature);
      // console.log(txID);
      // const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
      // const textCoder = new TextEncoder()
      // const secretKey = textCoder.encode(walletAddress)

      //WORKING CODE
      // const secret = [58,250,234,202,63,82,187,183,126,171,96,66,125,0,81,33,201,50,49,226,163,161,66,64,231,254,76,151,231,165,247,235,32,206,251,160,89,193,180,174,83,152,50,160,113,195,81,175,250,197,65,222,20,136,57,43,188,63,78,164,160,82,224,67]
      // const fromWallet = Keypair.fromSecretKey(new Uint8Array(secret))
      // const blockhash = (await connection.getLatestBlockhash()).blockhash

      // console.log(fromWallet)
      // const transaction = new Transaction().add(
      //   SystemProgram.transfer({
      //     fromPubkey: fromWallet.publicKey,
      //     toPubkey: new PublicKey(receiver),
      //     lamports: LAMPORTS_PER_SOL * amount
      //   })
      // )
      // transaction.recentBlockhash = blockhash

      // transaction.sign(fromWallet)
      // const signature = await sendAndConfirmTransaction(connection,transaction, [fromWallet])

      // await connection.confirmTransaction(signature)

      // console.log(signature)

      //Code for transferring SOL from Solflare Wallet

      // const res = await EventService.buyTicket({ ...data, signature }, eventId);
      // if (res.status === "success") {
      //   alert("You have successfully bought a ticket");
      //   window.location.assign("/ticket");
      // } else {
      //   alert("Sorry could not make payment please try again later");
      // }
    } catch (error) {
      console.log(error);
      alert(
        "Sorry could not make payment please try again later from catch block"
      );
    }
  }
  return {
    modal,
    loading,
    walletAddress,
    payWithWallet,
    addAccount,
    name,
    setName,
    email,
    setEmail,
    checkExistingUser,
    isOpened,
    isOpened2,
    setIsOpened2,
    disconnectWallet,
    connectWallet,
    opened,
    open,
    close,
    loadingConn,
    setIsOpened,
    connectToPhantomWallet,
    connectToSolflareWallet,
    showModal: () => {
      setModal((modal) => !modal);
    },
  };
}
