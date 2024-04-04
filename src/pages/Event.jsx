/** @format */
import { NavLink } from "react-router-dom";
// import { userCardData } from "../data";

import { motion } from "framer-motion";

import "../styles/user/user.scss";

import {
	ActionIcon,
	Autocomplete,
	Badge,
	Flex,
	ScrollArea,
	Tooltip,
} from "@mantine/core";
import "@mantine/core/styles.css";
import React, { useEffect, useState } from "react";

// **** ===> ===> Icon package <=== <=== ****
import { MdOutlineEvent } from "react-icons/md";
import { RxRocket } from "react-icons/rx";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import { TfiMicrophoneAlt } from "react-icons/tfi";
import { LuPartyPopper } from "react-icons/lu";
import { GrGamepad } from "react-icons/gr";
import { FaCode } from "react-icons/fa6";
import { FaTheaterMasks } from "react-icons/fa";
// import { LuCornerRightDown } from "react-icons/lu";

// <<< **** Packages **** >>>
import { Country, State } from "country-state-city";
import EventService from "../../services/EventService";

const Event = () => {
	// const [data, setData] = useState(userCardData);
	const [events, setEvents] = useState([]);

	React.useEffect(() => {
		const fetchEvents = async () => {
			console.log("getting events");
			try {
				const eventData = await EventService.getEvents();
				console.log(eventData);
				setEvents(eventData.data);
			} catch (error) {
				console.error("Error fetching events", error);
			}
		};

		fetchEvents();
	}, []);

	// state and coubtry
	const [states, setStates] = useState([]);
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");

	// **** >>> Function to get all states and country <<< ****
	const countries = Country.getAllCountries().flatMap(
		(country) => country.name,
	);
	const allStates = states.map((state) => state.name);

	useEffect(() => {
		async function getEvents() {
			const res = await EventService.getEvent("123");
			console.log(res);
		}
		getEvents();
		setStates(
			State.getStatesOfCountry(
				Country.getAllCountries().filter((item) => {
					return item.name == country;
				})[0]?.isoCode,
			),
		);
	}, [country]);

	const click = (id) => {
		const update = events?.map((item) => {
			if (item.id === id) {
				item.isLiked = !item.isLiked;
			}
			return item;
		});

		setEvents(update);
	};

	const cardData = events?.map((item, id) => {
		return (
			<div className="card" key={id}>
				<div className="cardimg">
					<img src={item.eventBanner} alt="" />
				</div>
				{/* <div className="cardactions">
					<Flex align={"center"} gap={"10px"}>
					
						{!item.isLiked ? (
							<Tooltip label="save">
								<ActionIcon
									onClick={() => click(item.id)}
									color="white"
									bg={"black"}
									size={"lg"}
									radius={"20px"}>
									<item.eventIconLike color="white" fontSize={"18px"} />
								</ActionIcon>
							</Tooltip>
						) : (
							<ActionIcon
								// variant="white"
								// onClick={() => click(item.id)}
								color="white"
								bg={"black"}
								size={"lg"}
								radius={"20px"}>
								<item.eventIconLikeFilled color="red" fontSize={"18px"} />
							</ActionIcon>
						)}

				
						<Tooltip label="add to checkout">
							<ActionIcon
								variant="white"
								bg={"black"}
								color="white"
								size={"lg"}
								radius={"20px"}>
								<item.eventIconAdd color="white" fontSize={"18px"} />
							</ActionIcon>
						</Tooltip>
					</Flex>
				</div> */}

				<NavLink className={"cardlink"} to={`eventdetails/${id}`}>
					<div className="cardtls">
						<h1>{item.eventTitle}</h1>
						<p className="date">{item.eventStarts._Timestamp}</p>
						<p className="location">{item.venue}</p>
						<div className="cardpricecont">
							<div className="crdprice">
								<img
									src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
									alt=""
								/>

								<p>{item.pricePerTicket}</p>
							</div>
							{/* <div className="cardpricestatus">
								<Badge size="sm" color={item.color}>
									{item.status}
								</Badge>
							</div> */}
						</div>
						{/* <p className="type">FREE</p> */}
					</div>
				</NavLink>
			</div>
		);
	});

	return (
		<div className="userwrp">
			<section className="sectioncont">
				<div className="bg">
					<div className="card">{/* <MdOutlineEvent /> */}</div>
					<div className="card"></div>
					<div className="card"></div>
					<div className="card">{/* <RxRocket /> */}</div>
				</div>
				<motion.header className="header">
					<div className="background-linear">
						<div className="box">
							<MdOutlineEvent />
						</div>
						<div className="box">
							<HiOutlineMusicalNote />
						</div>
						<div className="box">
							<RiRobot2Line />
						</div>
						<div className="box">
							<RxRocket />
						</div>
					</div>
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.7,
							},
						}}>
						Discover, engage, and network with individuals
					</motion.h1>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.3,
								delay: 1,
							},
						}}
						className="management">
						on SolNexus
					</motion.h1>
				</motion.header>
				<ScrollArea>
					<div className="filter-cont">
						<div className="filter">
							<div className="filtericon">
								<TfiMicrophoneAlt className={"filter-music-icon"} />
							</div>
							<div className="filtertxt">
								<p>Music</p>
							</div>
						</div>
						<div className="filter">
							<div className="filtericon">
								<LuPartyPopper />
							</div>
							<div className="filtertxt">
								<p>Nightlife</p>
							</div>
						</div>
						<div className="filter">
							<div className="filtericon">
								<GrGamepad />
							</div>
							<div className="filtertext">
								<p>Gaming</p>
							</div>
						</div>
						<div className="filter">
							<div className="filtericon">
								<FaCode />
							</div>
							<div className="filtertxt">
								<p>Tech</p>
							</div>
						</div>
						<div className="filter">
							<div className="filtericon">
								<FaTheaterMasks />
							</div>
							<div className="filtertext">
								<p>Visual Art</p>
							</div>
						</div>
					</div>
				</ScrollArea>

				{/* **** ===> ===> Browse events with state and country **** <=== <=== */}
				<div className="usercardcont">
					<div className="usercardheader">
						<h2>Browse Events in</h2>
						<div className="filtercont">
							<div className="filterinput">
								<Autocomplete
									value={country}
									onChange={(country) => {
										setCountry(country);
									}}
									size="md"
									data={countries}
									comboboxProps={{
										position: "bottom",
										middlewares: { flip: false, shift: false },
										shadow: false,
									}}
									placeholder="Country"
								/>
							</div>

							<div className="filterinput">
								<Autocomplete
									size="md"
									placeholder="Choose your state"
									value={state}
									onChange={(state) => {
										setState(state);
									}}
									data={allStates}
									rightSectionPointerEvents="none"
									comboboxProps={{
										position: "bottom",
										middlewares: { flip: false, shift: false },
										shadow: "false",
									}}
									disabled={country ? false : true}
								/>
							</div>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.1,
								delay: 0.7,
							},
						}}
						className="usercrdwrp">
						{cardData}
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default Event;
