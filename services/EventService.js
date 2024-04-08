/* eslint-disable no-unused-vars */
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
// import * as anchor from "@project-serum/anchor";
// import idl from "../utils/idl.json";

import FirebaseService from "./FirebaseService"

// const programID = new PublicKey(import.meta.env.VITE_APP_PROGRAM_ID);
// console.log(programID, "program ID set correctly");

// const network = clusterApiUrl("devnet");
// const opts = {
// 	preflightCommitment: "processed",
// };

// const getProvider = () => {
// 	const connection = new Connection(network, opts.preflightCommitment);
// 	const provider = new anchor.AnchorProvider(
// 		connection,
// 		window.solana,
// 		opts.preflightCommitment,
// 	);
// 	console.log(provider, "provider set correctly");
// 	return provider;
// };

const firebaseService = new FirebaseService("events")
const firebaseService2 = new FirebaseService("tickets")
class EventsService{
    async buyTicket(data){
      return await firebaseService2.create(data)
    }
    async getEvents(){
      return await firebaseService.get()
    }
    async getTickets(email){
      return await firebaseService2.find("email",email)
    }
    async getEvent(id){
      return await firebaseService.findById(id)
    }
}

export default new EventsService()
