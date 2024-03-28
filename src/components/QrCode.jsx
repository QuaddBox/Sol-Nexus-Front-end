/** @format */

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, Flex, Image, Tooltip } from "@mantine/core";
import QRCode from "qrcode";

import { IconDownload } from "@tabler/icons-react";
import { BsQrCodeScan } from "react-icons/bs";
import { TbBarcode } from "react-icons/tb";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const QrCode = () => {
	// **** QrCode generation function ****
	const [url, seturl] = useState("");
	const [qrCode, setQrCode] = useState("");

	const GenerateQrCode = () => {
		QRCode.toDataURL(
			url,
			{
				width: 800,
				margin: 1,
				// color: {
				// 	dark: "#cbaedb",
				// 	light: "#030303c0",
				// },
			},
			(err, url) => {
				if (err) return console.error(err);
				console.log(url);

				setQrCode(url);
			},
		);
	};

	const [opened, { open, close }] = useDisclosure(false);
	return (
		<div>
			<Modal opened={opened} onClose={close}>
				<Flex align={"center"} justify={"center"} gap={"10px"}>
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
				</Flex>
				<div className="qrcodecont">
					{qrCode && (
						<>
							<Image src={qrCode} className="qrcodeimg" />
							<Flex align={"center"} justify={"center"}>
								<Button variant="light" color="green">
									<NavLink
										to={qrCode}
										download={"qrCode.png"}
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

			<Tooltip label="generate code">
				<Button onClick={open} variant="light">
					<BsQrCodeScan />
				</Button>
			</Tooltip>
		</div>
	);
};

export default QrCode;
