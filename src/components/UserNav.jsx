/** @format */

import NavLogo from "./NavLogo";
import { NavLink } from "react-router-dom";
import NavModal from "./NavModal";

// react-Icons
import { IoMdHeartEmpty } from "react-icons/io";
import { TfiTicket } from "react-icons/tfi";
import { CgMenuGridR } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IconSearch } from "@tabler/icons-react";

// Solana wallet connect
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useDisclosure } from "@mantine/hooks";

// Mantine import library
import {
	Tooltip,
	ActionIcon,
	TextInput,
	rem,
	Loader,
	Modal,
	ModalBody,
	Menu,
} from "@mantine/core";

import "@mantine/core/styles.css";
import { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import idl from "../../utils/idl.json";
import { IconTrash } from "@tabler/icons-react";

const { SystemProgram, Keypair } = anchor.web3;

let myAccount = Keypair.generate();

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

//  const Retrieve = async () => {
//   const provider = getProvider()
//   const program = new anchor.Program(idl, programID, provider)
//   const account = await program.account.userProfile.fetch()
//  }

const createAccount = async () => {
	try {
		const provider = getProvider();
		const program = new anchor.Program(idl, programID, provider);

		let tx = await program.rpc.initialize(
			{name: "Godrice",
			test: "null",
			avatar: "null",
			email: "godriceonuwa@gmail.com",
			password: "GodriceEichie",
			date: new Date().toString(),},
			{
				accounts: {
					authority: myAccount.publicKey.toString(),
					userProfile: provider.wallet.publicKey,
					systemProgram: SystemProgram.programId,
				},
				signers: [myAccount],
			},
		);
		console.log(
			"Created a new account with address",
			myAccount.publicKey.toString(),
		);
	} catch (error) {
		console.log("Error creating account: ", error);
	}
};

const UserNav = (props) => {
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [walletAddress, setWalletAdresss] = useState("");
	const [isOpened, setIsOpened] = useState(false);

	const showModal = () => {
		setModal((modal) => !modal);
	};

	// useEffect(() => {
	//   const onLoad = () => {
	//     checkIfWalletConnected();
	//   };
	//   window.addEventListener("load", onLoad);
	//   return () => window.removeEventListener("load", onLoad);
	// }, []);

	const [opened, { open, close }] = useDisclosure(false);
	const [opened2, { open2, close2 }] = useDisclosure(false);

	const checkIfWalletConnected = async () => {
		const { solana } = window;
		try {
			setLoading(true);
			if (solana) {
				if (solana.isPhantom) {
					console.log("phatom is connected");
					const response = await solana.connect({
						onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
					});
					setWalletAdresss(response.publicKey.toString());
					console.log("public key", response.publicKey.toString());
					await createAccount();
				}
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const connectWallet = async () => {
		const { solana } = window;
		try {
			setLoading(true);
			if (solana) {
				const response = await solana.connect(); //to disconnect use "solana.disconnect()"
				setWalletAdresss(response.publicKey.toString());
				close();
				await createAccount();
			} else {
				alert("Please Install Solana's Phantom Wallet");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const disconnectWallet = async () => {
		const { solana } = window;
		try {
			setLoading(true);
			if (solana) {
				const response = await solana.disconnect(); //to disconnect use "solana.disconnect()"
				setWalletAdresss("");
				setOpened(false);
			} else {
				alert("Please Install Solana's Phantom Wallet");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};
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
						<NavLink
							to={
								"https://sol-nexus-user-dashboard.vercel.app/manage/events/create"
							}>
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

						<ModalBody className="flex flex-col gap-4">
							<div className="flex flex-col">
								<label htmlFor="">Name</label>
								<input
									className="bg-transparent border border-gray-400 rounded-md py-1.5 px-2 placeholder:text-sm"
									placeholder="Enter your name"
									type="text"
									name=""
									id=""
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="">Email</label>
								<input
									className="bg-transparent border border-gray-400 rounded-md py-1.5 px-2 placeholder:text-sm"
									placeholder="Enter your email"
									type="email"
									name=""
									id=""
								/>
							</div>
							<button
								className="bg-[#670c8b] mt-3 py-2 rounded-md"
								onClick={connectWallet}>
								Connect Wallet
							</button>
						</ModalBody>
					</Modal>

					<div className="navbtns">
						{/* ===> ===> **** Solana Wallet inbuilt component **** <=== <=== */}
						{/* <WalletMultiButton /> */}
						{/* {!loading ? (
              <button onClick={open}>
                {!walletAddress ? (
                  <span> Connect Wallet </span>
                ) : (
                  <span> Connected </span>
                )}
              </button>
            ) : (
              <Loader size={"sm"} />
            )} */}
						{!walletAddress ? (
              <button onClick={open}>
                <span>Connect Wallet</span>
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
                    }
                  >
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
