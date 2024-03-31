/** @format */

import solcom4 from "../assets/solcom4.jpg";

import { AiOutlineFieldTime } from "react-icons/ai";
import { TiLocation } from "react-icons/ti";
import { RiRefund2Line } from "react-icons/ri";
import { GrFormAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

import { notifications } from "@mantine/notifications";

import emailjs from "@emailjs/browser";

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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import "@mantine/core/styles.css";

const EventDetails = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [response, setResponse] = useState({ status: 200 });

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

	return (
		<div className="detailscont">
			<div className="detailsimage">
				<div className="imagecont">
					<img src={solcom4} height="400" />
				</div>
			</div>
			<div className="detailswrp">
				<div className="detailsleft">
					<div className="detailheadertxt">
						<div className="status">
							<Badge size="xl"  color={"#c2c20d"} fw={"bold"}>
								Ongoing
							</Badge>
							<p>Monday, March 4</p>
						</div>
						<h1>SOLverse Explorers</h1>
					</div>
					<div className="aboutevent">
						<h2>About this event</h2>
						<p>
							Will you like to further your studies abroad? Come meet with
							International Reps of top Universities in US, UK, Canada,
							Australia and more.
						</p>

						<div className="profilecomp">
							<h3>
								<span className="span">By</span> Solteam Entertainment
							</h3>
							<Button>View Profile</Button>
						</div>
					</div>

					<div className="date-time-wrp">
						<h2>Date and Time</h2>
						<div className="datetimeitems">
							<IoCalendarNumberOutline fontSize={"25px"} />
							<p>Saturday, April 6 · 11am - 2pm WAT</p>
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
							<p>
								Golden Tulip Garden City Hotel Stadium Road Port Harcourt, RV
								500101
							</p>
						</Flex>
					</div>

					{/* ****===> Modal <==== ***** */}
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
							<p>Golden Tulip Garden City Hotel</p>
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
								<ActionIcon variant="light" color="red">
									<IoIosRemove />
								</ActionIcon>
								<p>1</p>
								<ActionIcon variant="light" color="green">
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
							<p>20.00</p>
						</Flex>

						<Button w={"100%"} className="checkoutbtn spotbtn">
							Reserve a Spot
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
