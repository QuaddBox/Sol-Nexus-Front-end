/**
 * eslint-disable no-unused-vars
 *
 * @format
 */

/** @format */

import NavLogo from "./NavLogo";
import { NavLink } from "react-router-dom";
import NavModal from "./NavModal";
import { IoMdHeartEmpty } from "react-icons/io";
import { TfiTicket } from "react-icons/tfi";
import { CgMenuGridR } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IconSearch } from "@tabler/icons-react";
import {
	Tooltip,
	ActionIcon,
	TextInput,
	rem,
	Modal,
	ModalBody,
	Menu,
	Loader,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { IconTrash } from "@tabler/icons-react";
import useConnectWallet from "../hooks/useConnectWallet";
import { useDisclosure } from "@mantine/hooks";

const UserNav = (props) => {
	
	// random comment
	const {
		isOpened,
		opened,
		name,
		setName,
		email,
		loading,
		setEmail,
		loadingConn,
		checkExistingUser,
		modal,
		walletAddress,
		setIsOpened,
		showModal,
		disconnectWallet,
		connectWallet
	} = useConnectWallet();

	// const [opened, { open, close }] = useDisclosure(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await connectWallet()
	}
	return (
		<div className="navcont">
			<nav className="nav">
				<div className="navlogo">
					<NavLogo />
				</div>

				<div className="search">
					<TextInput
						radius={"xl"}
						size="md"
						// w={"35%"}
						autoComplete="true"
						placeholder="Search"
						rightSectionWidth={42}
						leftSection={
							<IconSearch
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
							/>
						}
						rightSection={
							<ActionIcon
								size={32}
								radius="xl"
								color={"#310144"}
								variant="filled">
								<IconSearch
									style={{ width: rem(18), height: rem(18) }}
									stroke={1.5}
								/>
							</ActionIcon>
						}
						{...props}
					/>
				</div>

				<div className="navitems">
					<div className="item create">
						<NavLink to={"https://sol-nexus-organizer.vercel.app/organizations/home"}>
							<IoMdAdd />
							Add event
						</NavLink>
					</div>
					<div className="item like">
						<Tooltip label="Likes">
							<NavLink to={"like"}>
								<ActionIcon variant="light" color="red">
									<IoMdHeartEmpty className="icon" fontSize={"20px"} />
								</ActionIcon>
							</NavLink>
						</Tooltip>
					</div>

					<div className="item">
						<Tooltip label="checkout">
							<NavLink to={"checkout"}>
								<ActionIcon variant="light" color="green">
									<IoBagCheckOutline
										className="icon"
										fontSize={"20px"}
										// color="#d4d3d3"
									/>
								</ActionIcon>
							</NavLink>
						</Tooltip>
					</div>

					<div className="item">
						<Tooltip label="tickets">
							<NavLink to={"ticket"}>
								<ActionIcon variant="light" color="yellow">
									<TfiTicket className="icon" fontSize={"20px"} />
								</ActionIcon>
							</NavLink>
						</Tooltip>
					</div>
					<Modal
						opened={opened}
						onClose={close}
						title="Register"
						overlayProps={{
							backgroundOpacity: 0.55,
							blur: 3,
						}}
						styles={{
							content: { border: "1px solid white" },
						}}
						centered>
						{/* Modal content */}

						<ModalBody >
							<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
							<div className="flex flex-col" >
								<label htmlFor="">Name</label>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="bg-transparent border border-gray-400 rounded-md py-1.5 px-2 placeholder:text-sm"
									placeholder="Enter your name"
									type="text"
									name=""
									minLength={3}
									required
									id=""
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="">Email</label>
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="bg-transparent border border-gray-400 rounded-md py-1.5 px-2 placeholder:text-sm"
									placeholder="Enter your email"
									type="email"
									name=""
									id=""
									required
								/>
							</div>
							<button
								disabled={loading}
								className="bg-[#670c8b] disabled:cursor-not-allowed  mt-3 py-2 rounded-md">
								{loading
								?<Loader color="white" size={24}/>
								:"Connect Wallet"}
							</button>
							</form>
						</ModalBody>
					</Modal>

					<div className="navbtns">
						{!walletAddress ? (
						<button style={{minWidth:"150"}} disabled={loadingConn} onClick={checkExistingUser}>
								{
									loadingConn
									?<Loader color="white" size={15}/>
									:<span>Connect Wallet</span>
								}
							</button>
						) : (
							<Menu opened={isOpened} onChange={setIsOpened}>
								<Menu.Target>
									<button>
										<span>Connected</span>
									</button>
								</Menu.Target>

								<Menu.Dropdown>
									<Menu.Item
										onClick={disconnectWallet}
										color="red"
										leftSection={
											<IconTrash style={{ width: rem(14), height: rem(14) }} />
										}>
										Disconnect
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						)}
					</div>

					<div className="account" onClick={showModal}>
						<ActionIcon bg={"dark"} color="white" radius={"20px"}>
							<CgMenuGridR />
						</ActionIcon>
					</div>
				</div>
			</nav>

			<div className="navmodal">{modal && <NavModal />}</div>
		</div>
	);
};

export default UserNav;
