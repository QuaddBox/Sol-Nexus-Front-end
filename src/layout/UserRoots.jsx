/** @format */

import { UserNav } from "../components";
import { Outlet } from "react-router-dom";
const UserRoots = () => {
	return (
		<div>
			<UserNav />
			<Outlet />
		</div>
	);
};

export default UserRoots;
