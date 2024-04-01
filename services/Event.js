import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import idl from "../utils/idl.json";

const programID = new PublicKey(import.meta.env.VITE_APP_PROGRAM_ID);
console.log(programID, "program ID set correctly");

const network = clusterApiUrl("devnet");
const opts = {
	preflightCommitment: "processed",
};

const getProvider = () => {
	const connection = new Connection(network, opts.preflightCommitment);
	const provider = new anchor.AnchorProvider(
		connection,
		window.solana,
		opts.preflightCommitment,
	);
	console.log(provider, "provider set correctly");
	return provider;
};

class EventsService{
    programID = new PublicKey(import.meta.env.VITE_APP_PROGRAM_ID);
    
    async buyTicket(payer){
        console.log(payer)

    }
    async getEvents(){
      const provider = getProvider();
      const program = new anchor.Program(idl, programID, provider);
  
      const test = program.methods
      console.log(test)
    }
    async getEvent(id){
      console.log(id)
    }
}

export default new EventsService()