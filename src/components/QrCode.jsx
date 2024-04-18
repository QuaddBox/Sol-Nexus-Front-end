/* eslint-disable react/prop-types */
/** @format */

// import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Flex, Image, Tooltip, Loader } from "@mantine/core";
// import QRCode from "qrcode";

import { IconDownload } from "@tabler/icons-react";
import { BsQrCodeScan } from "react-icons/bs";
// import { TbBarcode } from "react-icons/tb";
// import { useState } from "react";
import { NavLink } from "react-router-dom";

const QrCode = (props) => {
	// **** QrCode generation function ****
	

	// const [opened, { open, close }] = useDisclosure(false);
	const {
		qrCode,
		opened,
		close,
		generateQRCode,
		ticketGenerated,
		loading,
		ticketName
	} = props;
	const generate = ()=>{
		// console.log("Hello")
		generateQRCode()
	}
	console.log(props)
	return (
		<div>
			<Modal opened={opened} onClose={close}>
				{/* <Flex align={"center"} justify={"center"} gap={"10px"}>
					<Input
						placeholder="e.g token_id"
						w={"85%"}
						value={url}
						onChange={(e) => seturl(e.target.value)}
					/>
					<Button
						variant="light"
						color="green"
						w={"15%"}
						onClick={GenerateQrCode}>
						<TbBarcode />
					</Button>
				</Flex> */}
				<div className="qrcodecont">
					{qrCode && (
						<>
							<Image src={qrCode} className="qrcodeimg" />
							<Flex align={"center"} justify={"center"}>
								<Button variant="light" color="green">
									<NavLink
										to={qrCode}
										download={ticketName}
										className={"qrcode-download"}>
										Download
										<IconDownload size={"15px"} />
									</NavLink>
								</Button>
							</Flex>
						</>
					)}
				</div>
			</Modal>

			<Tooltip label={ticketGenerated?"You have already generated a ticket for this event":"generate code"}>
				{loading
				?(
				<Button variant="light">
					<Loader size={24} color="purple"/>
				</Button>
				)
				:(<Button disabled={ticketGenerated} onClick={generate} variant="light">
					<BsQrCodeScan />
				</Button>)}
			</Tooltip>
		</div>
	);
};

export default QrCode;
