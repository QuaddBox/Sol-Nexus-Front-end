/** @format */
import "../styles/user/ticket.scss";

import { useDisclosure } from "@mantine/hooks";
import {
	ActionIcon,
	Button,
	Flex,
	Image,
	Input,
	Modal,
	Tooltip,
} from "@mantine/core";
// import "@mantine/core/styles.css";

import solcom3 from "../assets/solcom3.jpg";

import { FaMoneyBillTransfer } from "react-icons/fa6";
import { QrCode } from "../components";

const Tickets = () => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<div className="ticketwrp">
			<h1>Tickets</h1>
			<div className="ticket-item">
				<div className="ticket-card">
					<div className="ticket-left">
						<h2>SOLverse Explorers</h2>
						<p className="date">Today at 7:50pm</p>
						<p className="location">
							Dance Salsa and Bachata Fridays - Space 550, San Francisco
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
							<p>20.00</p>
						</Flex>
					</div>
					<div className="ticket-card-right">
						<Image src={solcom3} />
						<Modal opened={opened} onClose={close} id="transfer-modal" centered>
							<Flex direction={"column"} gap={"10px"}>
								<div className="amountOfTicket">
									<Input
										type="number"
										className="ticketinput"
										placeholder="Input amount of ticket"
									/>
									<p className="ticketamount">amount: 2</p>
								</div>

								<Input
									type="text"
									className="ticketinput"
									placeholder="input wallet adress"
								/>

								<Button mt={"20px"} bg={"rgb(37, 1, 46)"}>
									Send Ticket
								</Button>
							</Flex>
						</Modal>

						<div className="tranfer-cont">
							
								<QrCode />
						
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
				</div>
			</div>
		</div>
	);
};

export default Tickets;
