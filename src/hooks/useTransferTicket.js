/* eslint-disable react/prop-types */
/** @format */
import { useState } from "react";
import EventService from "../../services/EventService";
import Accounts from "../../services/Accounts";



export default function useTransferTicket(props,close){
    const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{1,}\b/gi;
	const [loadingTransfer, setLoadingTransfer] = useState(false)
	const [email, setEmail] = useState("")
	const [attendeeName, setAttendeeName] = useState("")
	const [attendeeAddress, setAttendeeAddress] = useState("")

    const validateFields = ()=>{
        if(!email || email.trim().length === 0){
            throw new Error("Please provide new attendee Email")
        }
        if(!email.match(emailRegex)){
            throw new Error("Please provide a valid Email")
        }
        if(!attendeeName || attendeeName.trim().length === 0){
            throw new Error("Please provide new attendee Name")
        } 
        if(attendeeName.trim().length < 3){
            throw new Error("Please provide atleast 3 characters as attendee Name")
        }
        if(!attendeeAddress || attendeeAddress.trim().length === 0){
            throw new Error("Attendee Address is required")
        }
    }
	const transferTicket = async() =>{
		try {
            validateFields()
			setLoadingTransfer(true);
			const res = await Accounts.findUser(attendeeAddress)
			if(res.status !== "success"){
				throw new Error("User does not exist You can only transfer ticket to an existing user");
			}
			if(props.quantity && props.quantity > 1) {
				const res2 = await EventService.buyTicket({
					...props,
					attendeeAddress,
					attendee:email,
					attendeeName,
                    ticketGenerated:false,
					transferred:true,
                    quantity:1,
				})
				await EventService.updateTicket(props.id,{
					quantity:parseInt(props.quantity) - 1 
				})
				if(res2.status !== "success"){
					throw new Error("Sorry could not transfer ticket please try again later")
				}
				alert(`You have successfully transferred ticket to ${attendeeName}`)
                return;

			}
			const res3 = await EventService.updateTicket(props.id,{
				attendeeAddress,
				attendee:email,
				attendeeName,
				transferred:true,
                ticketGenerated:false,
			})
			if(res3 && res3.status !== "success"){
				throw new Error("Sorry could not transfer ticket please try again later")
			}
            close()
			window.location.reload()
			alert(`You have successfully transferred ticket to ${attendeeName}`)
		} catch (error) {
			console.log(error);
			alert(error)
		}finally{
			setLoadingTransfer(false);
		}

	}
    return{
        email,
        setEmail,
        attendeeAddress,
        setAttendeeAddress,
        attendeeName,
        setAttendeeName,
        transferTicket,
        loadingTransfer
    }
}