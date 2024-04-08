/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// import {
// 	Connection,
// 	Keypair,
// 	LAMPORTS_PER_SOL,
// 	PublicKey,
// 	sendAndConfirmTransaction,
// 	SystemProgram,
// 	Transaction,
// 	TransactionInstruction,
// } from "@solana/web3.js";
// import {
// 	encodeURL,
// 	validateTransfer,
// 	parseURL,
// 	TransferRequestURL,
// 	findReference,
// } from "@solana/pay";
// import BigNumber from "bignumber.js";

import "./index.scss";
import { createTheme, MantineProvider } from "@mantine/core";
import WalletConnetProvider from "./functions/WalletConnectProvider.jsx";
import "@mantine/notifications/styles.css";

import { Notifications } from "@mantine/notifications";
import WalletContextProvider from "./contexts/WalletContext.jsx";
import { CheckoutProvider } from "./contexts/CheckoutContext.jsx";

const theme = createTheme({});

// const secret = [
// 	171, 138, 45, 151, 179, 203, 102, 26, 13, 206, 228, 22, 249, 34, 31, 13, 246,
// 	127, 211, 250, 247, 239, 45, 91, 77, 30, 255, 193, 244, 219, 183, 118, 146,
// 	53, 136, 97, 38, 249, 239, 21, 181, 158, 69, 1, 57, 221, 42, 242, 172, 251,
// 	202, 61, 190, 168, 241, 177, 143, 152, 50, 214, 215, 36, 96, 186,
// ];
// const payer = Keypair.fromSecretKey(new Uint8Array(secret));

ReactDOM.createRoot(document.getElementById("root")).render(
	<WalletConnetProvider>
		<React.StrictMode>
			<MantineProvider theme={theme}>
				<Notifications position="top-center" />
				<WalletContextProvider>
					<CheckoutProvider>
						<App />
					</CheckoutProvider>
				</WalletContextProvider>
			</MantineProvider>
		</React.StrictMode>
	</WalletConnetProvider>,
);
