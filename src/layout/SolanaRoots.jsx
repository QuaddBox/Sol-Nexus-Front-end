/** @format */

import { Outlet } from "react-router-dom";
import { Logo } from "../components";

const SolanaRoots = () => {
	return (
		<div className="rootwrp">
			<Logo />
			<Outlet />
		</div>
	);
};

export default SolanaRoots;
