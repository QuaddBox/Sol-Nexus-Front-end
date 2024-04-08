/**
 * eslint-disable no-unused-vars
 *
 * @format
 */

/* eslint-disable react/prop-types */
/** @format */

import EventService from "../../services/EventService";
import { useParams, NavLink, Link } from "react-router-dom";
import NotFoundPage from "./NotFound";
import { ProfileView } from "../components";

// React Icons
import { AiOutlineFieldTime } from "react-icons/ai";
import { TiLocation } from "react-icons/ti";
import { RiRefund2Line } from "react-icons/ri";
import { GrFormAdd } from "react-icons/gr";
import { IoIosRemove, IoMdArrowRoundBack } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

import emailjs from "@emailjs/browser";
import { DateTime } from "luxon";

// ===> ===> Mantine Packages <=== <===
import {
	Flex,
	Button,
	ActionIcon,
	Image,
	Modal,
	TextInput,
	Textarea,
	Loader,
	Badge,
	Popover,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import useConnectWallet from "../hooks/useConnectWallet";
import { CustomWalletContext } from "../contexts/WalletContext";

const EventDetails = () => {
	// ===> ===> State to report event <=== <===
	const [name, setName] = useState("");
	const {payWithWallet} = useConnectWallet()
	const {user,walletAddress} = useContext(CustomWalletContext)
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [loadingBuyingTicket,setLoadingBuyingTicket] = useState(false)

	// **** ===> ===> State to add and minus count <=== <===
	const [count, setCount] = useState(0);

	// ===> ===> Response State to get eventById <=== <===
	const [response, setResponse] = useState({ status: 200 });
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const [events, setEvents] = useState(null);

	// ===> ===> Modal <=== <===
	const [opened, { open, close }] = useDisclosure(false);
	const [openedPopUp,{open:openPopUp, close:closePopUp}] = useDisclosure(false);

	// ===> ===> GET EVENT BY ID <=== <===
	useEffect(() => {
		const getEventById = async () => {
			try {
				// console.log("getting data by id");
				const eventDetailsData = await EventService.getEvent(id);
				// console.log(eventDetailsData);
				setEvents(eventDetailsData.data);
			} catch (error) {
				// console.error(error.message);
			}finally{
				setLoading(false);
			}
		};

		getEventById();
	}, [id]);

	const handleBuyTicket = async()=>{
		setLoadingBuyingTicket(true)
		console.log({
			w:events.walletAddress,
			c:count * events.pricePerTicket
		})
		await payWithWallet(
			events.walletAddress,count * events.pricePerTicket,
			{...user},
			events.id
		)
		setLoadingBuyingTicket(false)
	}
	// ===> ===> REPORT EVENT WITH EMAIL <=== <===
	const handleSubmit = async (e) => {
		e.preventDefault();

		// ServiceId, templateID, publickey
		const serviceId = "service_xb34dlf";
		const templateId = "template_kvv11dd";
		const publicKey = "MQyDG0_rTqyh7cNIX";

		const templateParams = {
			from_name: name,
			from_email: email,
			to_name: "Solnexus",
			message: message,
		};

		setIsLoading(true);

		// send the email using Emailjs
		emailjs
			.send(serviceId, templateId, templateParams, publicKey)
			.then((res) => {
				console.log("Email sent successfully", res);
				setResponse(res.data);

				setName("");
				setEmail("");
				setMessage("");
				setIsLoading(false);

				if (response.status == res.status) {
					notifications.show({
						color: "green",
						title: "success",
						message: "message sent successfully",
					});

					if (response.status != res.status) {
						notifications.show({
							color: "red",
							title: "failed",
							message: "message not sent please try again",
						});
					}
				}
			})
			.catch((err) => {
				console.error("Error sending email", err);
			});
	};

	// ===> ===> Loading effect when loading the event's details <=== <===
	if (loading) {
		return (
			<div className="max-w-2xl mx-auto h-[80vh] flex items-center justify-center">
				<div className="text-center">
					<Loader size={70} color="purple" />
					<p className="text-xl font-bold my-2">Loading Event</p>
				</div>
			</div>
		);
	}

	// ===> ===> Adding and minus Count <=== <===
	const ticketMinusCount = () => {
		if (count > 0) return setCount((prevCount) => prevCount - 1);
	};

	const ticketAddCount = () => {
		return setCount((prevCount) => prevCount + 1);
	};

	// ===> ===> displays NOTFOUND Component if the event doesn't exist or something went wrong <=== <===
	if (events === null) {
		return (
			<NotFoundPage
				title={"Sorry could not get event, it may be deleted or moved"}
			/>
		);
	}

	// ===> ===> Date Functionality <=== <===
	const startDate = DateTime.fromSeconds(events.eventStarts.seconds);
	const endDate = DateTime.fromSeconds(events.eventEnds.seconds);

	// ===> ===> displaying the color according to the event status <=== <===
	const getColor = (status) => {
		if (status.toLowerCase() === "not started") return "#9e9e9e";
		if (status.toLowerCase() === "ongoing") return "#c2c20d";
		return "#1f9707";
	};
	const getStatus = () => {
		if (startDate.diffNow() > 0) return "not started";
		if (endDate.diffNow() > 0) return "ongoing";
		return "completed";
	};
	// console.log({ startDate, endDate });

	return (
		<div className="detailscont">
			<NavLink to={".."} className={"back-to-events-link"}>
				<IoMdArrowRoundBack fontSize={18} /> Back to events
			</NavLink>
			<div className="detailsimage">
				<div className="imagecont">
					<img src={events.eventBanner} height="400" />
				</div>
			</div>
			<div className="detailswrp">
				<div className="detailsleft">
					<div className="detailheadertxt">
						<div className="status">
							<Badge size="xl" color={getColor(getStatus())} fw={"bold"}>
								{getStatus()}
							</Badge>
							<p>
								{startDate.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
							</p>
						</div>
						<h1>{events.eventTitle}</h1>
					</div>
					<div className="aboutevent">
						<h2>About this event</h2>
						<p>{events.description}</p>

						<div className="profilecomp">
							<h3>
								<span className="span">By</span> {events.host}
							</h3>
							{walletAddress !== events.walletAddress?
							<ProfileView {...events} />
							:(
							<button className="px-4 rounded-md bg-purple-800 text-white font-bold disabled:cursor-not-allowed spotbtn py-2">
								You
							</button>
							)
							}
						</div>
					</div>

					<div className="date-time-wrp">
						<h2>Date and Time</h2>
						<div className="datetimeitems">
							<IoCalendarNumberOutline fontSize={"25px"} />
							<p>
								{startDate.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} -{" "}
								{endDate.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
							</p>
						</div>
					</div>

					<div className="detail-location">
						<h2>Location</h2>
						<Flex
							align={"center"}
							gap={"10"}
							w={"45%"}
							pt={"5px"}
							className="locationcont">
							<CiLocationOn fontSize={"2.5rem"} className="locationicon" />
							<p>{events.venue}</p>
						</Flex>
					</div>

					{/* ****===> Modal for reportin event <==== ***** */}
					<Modal opened={opened} onClose={close}>
						<form onSubmit={handleSubmit}>
							<TextInput
								withAsterisk
								label="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<TextInput
								withAsterisk
								label="Email"
								mt={"10px"}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Textarea
								size="lg"
								withAsterisk
								label="Description"
								mt={"10px"}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
							<div className="modalbtn">
								{/* {isLoading && <Loader color="white" />} */}
								<Button fullWidth type="submit">
									{isLoading ? <Loader color="white" size={"sm"} /> : "submit"}
								</Button>
							</div>
						</form>
					</Modal>

					<div className="report">
						<ActionIcon
							variant="light"
							color="red"
							w={"25%"}
							p={"20px 2%"}
							className="reporticon"
							onClick={open}>
							<Flex
								align={"center"}
								justify={"center"}
								gap={"10px"}
								className="reportitem">
								<MdReportProblem fontSize={"15px"} />
								<p>Report this event</p>
							</Flex>
						</ActionIcon>
					</div>
				</div>

				<div className="checkout-cont">
					<div className="checkoutitems">
						<Flex align={"center"} gap={"20px"} p={"5px 0px"}>
							<TiLocation />
							<p>{events.venue}</p>
						</Flex>
						<Flex align={"center"} gap={"20px"} p={"5px 0px"}>
							<AiOutlineFieldTime />
							<p>3 hours</p>
						</Flex>
						<Flex align={"center"} gap={"20px"} p={"5px 0px"}>
							<RiRefund2Line />
							<p>Refund Policy</p>
						</Flex>
					</div>

					<div className="spotcont">
						<Flex align={"center"} gap={"30px"}>
							<h3 className="spothead">Book a ticket</h3>
							<Flex align={"center"} gap={"10px"}>
								<ActionIcon
									variant="light"
									color="red"
									onClick={ticketMinusCount}
									disabled={ticketMinusCount < 0}>
									<IoIosRemove />
								</ActionIcon>
								<p>{count}</p>
								<ActionIcon
									variant="light"
									color="green"
									onClick={ticketAddCount}>
									<GrFormAdd />
								</ActionIcon>
							</Flex>
						</Flex>

						<Flex
							align={"center"}
							gap={"5px"}
							className="like-card-price"
							pt={"10px"}>
							<Image
								w={"20px"}
								src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
								alt=""
							/>
							<p>{events.pricePerTicket}</p>
						</Flex>
						{walletAddress !== events.walletAddress?(
							walletAddress===null
							?<Popover opened={openedPopUp}  width="target" position="bottom" withArrow shadow="md">
								<Popover.Target>
									<Button classNames={"w-full"} onMouseEnter={openPopUp} onMouseLeave={closePopUp}
										className="checkoutbtn spotbtn opacity-50 cursor-not-allowed">
										Reserve a Spot
									</Button>
                                </Popover.Target>
								<Popover.Dropdown style={{ pointerEvents: 'none' }}>
									<p className="text-xs text-purple-600">Please connect your wallet to be able to buy ticket</p>
								</Popover.Dropdown>
							</Popover>
							:(
								<button
									disabled={loadingBuyingTicket}
									onClick={handleBuyTicket}
									className="w-full rounded-md bg-purple-800 text-white font-bold disabled:cursor-not-allowed spotbtn py-2">
									{
										loadingBuyingTicket
										?<Loader size={20} color="white"/>
										:"Reserve a Spot"
									}
								</button>
							)
						)
						:(
							<Link to={"/organization/events"}>
								<button	className="w-full rounded-md bg-purple-800 text-white font-bold disabled:cursor-not-allowed spotbtn py-2">
									View Your Event
								</button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
