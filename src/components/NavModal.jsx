/** @format */

import { NavLink } from "react-router-dom";

// Solana wallet connect Modal
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const NavModal = () => {
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

			<div className="nav-modal-btn">
				<button>
					<WalletMultiButton />
				</button>
			</div>
		</div>
	);
};

export default NavModal;
