/* eslint-disable react/prop-types */
/** @format */
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { QrCode } from "./index";
import { useDisclosure } from "@mantine/hooks";
import QRCode from "qrcode";
import {
	ActionIcon,
	Button,
	Flex,
	Image,
	Input,
	Loader,
	Modal,
	Tooltip,
} from "@mantine/core";
import { DateTime } from "luxon";
import { useState } from "react";
import EventService from "../../services/EventService";
import useTransferTicket from "../hooks/useTransferTicket";

export default function TicketCard(props){
    const [loading, setLoading] = useState(false);
	const {event} = props

	const startDate = DateTime.fromSeconds(event.eventStarts.seconds,{});
	const [opened, { open, close }] = useDisclosure(false);
	const [qrCodeOpened, { open:openQR, close:closeQR }] = useDisclosure(false);
    const [qrCode, setQrCode] = useState("");
    
	const {
		email,
		setEmail,
		attendeeAddress,
		setAttendeeAddress,
		transferTicket,
		attendeeName,
		loadingTransfer,
		setAttendeeName
	} = useTransferTicket(props,close)

	const generateQRCode = async() => {
        try {
            setLoading(true);
            const code = await QRCode.toDataURL(props.id,{
				width: 800,
				margin: 1,
				// color: {
				// 	dark: "#cbaedb",
				// 	light: "#030303c0",
				// },
			});
            const res = await EventService.updateTicket(props.id,{ticketGenerated:true})
            setLoading(false)
            if(res.status !== "success"){
                alert("Sorry an error occurred while generating Ticket Qr Code Please Try again later")
                return;
            }
			setQrCode(code);
            openQR()
        } catch (error) {
            alert("Sorry an error occurred while generating Ticket Qr Code")
        }
	};
	return (
	<div className="ticket-card">
	<div className="ticket-left">
		<h2>{event.eventTitle}</h2>
		<p className="date">{startDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)} {startDate.hour}:{startDate.minute} {startDate.zoneName}</p>
		<p className="location">
			{event.venue}
		</p>
		<Flex
			align={"center"}
			gap={"10px"}
			className="like-card-price"
			pt={"10px"}>
			<Image
				w={"20px"}
				src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
				alt=""
			/>
			<p>{event.pricePerTicket} SOL</p>
		</Flex>
		<p className="location my-2"><span className="font-bold text-purple-500">{props.quantity}</span> Ticket(s)</p>

	</div>
	<div className="ticket-card-right">
		<Image src={event.eventBanner} />
		<Modal title={"Transfer Ticket"} opened={opened} onClose={close} id="transfer-modal" centered>
			<Flex direction={"column"} gap={"10px"}>
				{/* <div className="amountOfTicket"> */}
					{/* <Input
						type="number"
						className="ticketinput"
						placeholder="Ticket Number"
					/> */}
					{/* <p className="ticketamount">amount: 2</p> */}
				{/* </div> */}

				{/* <Input
					type="text"
					className="ticketinput"
					placeholder="input wallet adress"
				/> */}
				<Input
					type="text"
					value={email}
					onChange={e=>{setEmail(e.target.value)}}
					className="ticketinput"
					placeholder="Enter email address"
				/>
				<Input
					type="text"
					value={attendeeName}
					onChange={e=>{setAttendeeName(e.target.value)}}
					className="ticketinput"
					placeholder="Enter Name of Reciever"
				/>
				<Input
					type="text"
					value={attendeeAddress}
					onChange={e=>{setAttendeeAddress(e.target.value)}}
					className="ticketinput"
					placeholder="Enter attendee Wallet address"
				/>

				<Button disabled={loadingTransfer} onClick={transferTicket} mt={"20px"} bg={"rgb(37, 1, 46)"}>
					{loadingTransfer
					?<Loader size={24} color="purple"/>
					:"Send Ticket"
					}
				</Button>
			</Flex>
		</Modal>

		<div className="tranfer-cont">
			<QrCode
            loading={loading}
            qrCode={qrCode}
            ticketName={`${event.eventTitle}_ticket_for_${props.attendeeName}`}
            opened={qrCodeOpened}
            ticketGenerated={props.ticketGenerated}
            close={closeQR}
            generateQRCode={generateQRCode}
            />
			<Tooltip label="transfer for a friend">
				<ActionIcon
					variant="light"
					color="green"
					size={"lg"}
					onClick={open}>
					<FaMoneyBillTransfer />
				</ActionIcon>
			</Tooltip>
		</div>
	</div>
</div>)
}