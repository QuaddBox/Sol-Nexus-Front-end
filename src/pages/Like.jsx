/** @format */
import { Flex, Image } from "@mantine/core";
import "../styles/user/like.scss";

import solcom3 from "../assets/solcom3.jpg";

import { FaHeart } from "react-icons/fa";

const Like = () => {
	
	return (
		<div className="like-cont">
			<h1>Likes</h1>
			<div className="like-item">
				<div className="like-card">
					<div className="like-card-left">
						<h2>SOLverse Explorers</h2>
						<p className="date">Today at 7:50pm</p>
						<p className="location">
							Dance Salsa and Bachata Fridays - Space 550, San Francisco
						</p>
						<Flex
							align={"center"}
							gap={"10px"}
							className="like-card-price"
							pt={"10px"}>
							<Image
								w={"20px"}
								src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGUhFcmpx1XGdLGwXRiNxxMU=/solana-integration-2023-01-04%2000-00-00-2023-10-11%2004-44-58"
								alt=""
							/>
							<p>20.00</p>
						</Flex>
					</div>
					<div className="like-card-right">
						<Image src={solcom3} />
						<div className="like-icon-cont">
							<FaHeart className="like-icon" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Like;
