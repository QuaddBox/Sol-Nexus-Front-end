/* eslint-disable react/prop-types */
/** @format */
import "../styles/user/ticket.scss";
import { Loader,} from "@mantine/core";


import { useContext, useEffect, useState } from "react";
import { CustomWalletContext } from "../contexts/WalletContext";
import EventService from "../../services/EventService";
import NotFoundPage from "./NotFound";
import TicketCard from "../components/TicketCard";

const Tickets = () => {
	const [loading,setIsLoading] = useState(true);
	const [tickets,setTickets] = useState([])
	const {user} = useContext(CustomWalletContext)
	
	useEffect(()=>{
		async function getTickets(){
			setIsLoading(true)
			const res = await EventService.getTickets(user.email)
			setIsLoading(false)
			if(res.status === "success"){
				setTickets(res.data)
			}
		}
		if(user){
			getTickets()
		}
	},[user])
	if(loading){
		return (
			<div className="max-w-2xl mx-auto h-[80vh] flex items-center justify-center">
				<div className="text-center">
					<Loader size={70} color="purple" />
					<p className="text-xl font-bold my-2">Loading Tickets</p>
				</div>
			</div>
		)
	}
	if(tickets.length < 1){
		return <NotFoundPage title={"Sorry you have not bought any ticket yet"}/>
	}
	return (
		<div className="ticketwrp">
			<h1>Tickets</h1>
			<div className="ticket-item">
				{tickets.map(ticket=>(
					<TicketCard key={ticket.id} {...ticket}/>
				))}
			</div>
		</div>
	);
};

export default Tickets;
