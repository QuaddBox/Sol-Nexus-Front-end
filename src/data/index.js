/** @format */
import solcom1 from "../assets/solcom1.jpg";
import solcom2 from "../assets/solcom2.jpg";
import solcom3 from "../assets/solcom3.jpg";
import solcom4 from "../assets/solcom4.jpg";
import solcom5 from "../assets/solcom5.jpg";
import solcom6 from "../assets/solcom6.jpg";
import community from "../assets/community.png";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { GrAdd } from "react-icons/gr";

const userCardData = [
	{
		id: 1,
		imagePath: solcom1,
		eventName: "SOLverse Explorers",
		eventDate: "Wed, Apr 10 • 6:00 PM",
		eventlocation: "21 Bekwere Wosu St",
		eventPrice: "0.45",
		eventIconLike: FaRegHeart,
		eventIconLikeFilled: FaHeart,
		eventIconAdd: GrAdd,
		isLiked: false,
		status: "completed"
	},
	{
		id: 2,
		imagePath: solcom2,
		eventName: "SolanaSynergy Society",
		eventDate: "Wed, Dec 3 • 6:00 PM",
		eventlocation: "21 Bekwere Wosu St",
		eventPrice: "0.65",
		eventIconLike: FaRegHeart,
		eventIconLikeFilled: FaHeart,
		eventIconAdd: GrAdd,
		isLiked: false,
		status: "ongoing"
	},
	{
		id: 3,
		imagePath: solcom3,
		eventName: "StellarSolana Collective",
		eventDate: "Mon, Jun 7 • 6:00 PM",
		eventlocation: "21 Bekwere Wosu St",
		eventPrice: "1.45",
		eventIconLike: FaRegHeart,
		eventIconLikeFilled: FaHeart,
		eventIconAdd: GrAdd,
		isLiked: false,
		status: "ongoing"
	},
	{
		id: 4,
		imagePath: solcom4,
		eventName: "SunlitSolana Network",
		eventDate: "Fri, Oct 5 • 6:00 PM",
		eventlocation: "21 Bekwere Wosu St",
		eventPrice: "2",
		eventIconLike: FaRegHeart,
		eventIconLikeFilled: FaHeart,
		eventIconAdd: GrAdd,
		isLiked: false,
		status: "completed"
	},

	{
		id: 5,
		imagePath: solcom5,
		eventName: "SolanaPulse Community",
		eventDate: "Sat, Sept 14 • 6:00 PM",
		eventlocation: "21 Bekwere Wosu St",
		eventPrice: "0.005",
		eventIconLike: FaRegHeart,
		eventIconLikeFilled: FaHeart,
		eventIconAdd: GrAdd,
		isLiked: false,
		status: "ongoing"
	},

	{
		id: 6,
		imagePath: solcom6,
		eventName: "SolanaPulse Community",
		eventDate: "Sat, Sept 14 • 6:00 PM",
		eventlocation: "21 Bekwere Wosu St",
		eventPrice: "0.005",
		eventIconLike: FaRegHeart,
		eventIconLikeFilled: FaHeart,
		eventIconAdd: GrAdd,
		isLiked: false,
		status: "completed"
	},

	{
		id: 7,
		imagePath: community,
		eventName: "SolanaPulse Community",
		eventDate: "Sat, Sept 14 • 6:00 PM",
		eventlocation: "21 Bekwere Wosu St",
		eventPrice: "0.005",
		eventIconLike: FaRegHeart,
		eventIconLikeFilled: FaHeart,
		eventIconAdd: GrAdd,
		isLiked: false,
		status: "ongoing"
	},
];

const checkoutData = [
	{
		id: 1,
		imagePath: solcom1,
		title: "SunlitSolana Network",
		count: 0
	},

	{
		id: 2,
		imagePath: solcom2,
		title: "SolanaSynergy Society",
		count: 0
	},
];

const ticketData = {

}

export { userCardData, checkoutData, ticketData };
