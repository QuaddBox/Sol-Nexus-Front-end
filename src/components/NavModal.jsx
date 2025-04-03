/** @format */

import { NavLink } from "react-router-dom";

// Solana wallet connect Modal
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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

import useConnectWallet from "../hooks/useConnectWallet";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import "../styles/user/user.scss";

const NavModal = () => {
	const {
		isOpened,
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
		connectWallet,
	} = useConnectWallet();

	const [opened, { open, close }] = useDisclosure(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await connectWallet();
	};
	return (
		<div className="nav-modal-links">
			<div className="item create">
				<NavLink
					to={
						"https://sol-nexus-user-dashboard.vercel.app/manage/events/create"
					}>
					Add event
				</NavLink>
			</div>
			<NavLink to={"like"}>Save items</NavLink>
			<NavLink to={"ticket"}>Ticket</NavLink>
			<NavLink to={"checkout"}>Checkout</NavLink>

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

				<ModalBody>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						<div className="flex flex-col">
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
							{loading ? <Loader color="white" size={24} /> : "Connect Wallet"}
						</button>
					</form>
				</ModalBody>
			</Modal>

			<div className="navbtns">
				{!walletAddress ? (
					<button
						style={{ minWidth: "150" }}
						disabled={loadingConn}
						onClick={checkExistingUser}>
						{loadingConn ? (
							<Loader color="white" size={15} />
						) : (
							<span>Connect Wallet</span>
						)}
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
		</div>
	);
};

export default NavModal;
