/** @format */

import { Avatar, Button, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";

const ProfileView = (props) => {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<div className="profileviewcont">
			<Modal opened={opened} onClose={close} centered>
				<Flex direction={"column"} gap={"10px"}>
					<Flex align={"center"} justify={"center"}>
						<Avatar
							size={"xl"}
							src={props.organiserProfile.banner}
							w={"150px"}
							h={"150px"}
						/>
					</Flex>
					<h1 className="profileviewtitle">{props.organiserProfile.name}</h1>
					<p className="profilebio">{props.organiserProfile.bio}</p>

					<NavLink to={props.organiserProfile.website}>
						{props.organiserProfile.website}
					</NavLink>
				</Flex>
			</Modal>

			<Button onClick={open} styles={{label: {fontSize: "1rem"}}}>View Profile</Button>
		</div>
	);
};

export default ProfileView;
