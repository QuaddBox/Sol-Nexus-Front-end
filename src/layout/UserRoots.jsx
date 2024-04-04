/** @format */
// import EventService from "../../services/EventService";
// import { useEffect } from "react";
import { UserNav } from "../components";
import { Outlet } from "react-router-dom";
const UserRoots = () => {
	// useEffect(() => {
	// 	EventService.getEvents();
	// 	// Event.getEvents()
	// }, []);
	return (
		<div>
			<UserNav />
			<Outlet />
		</div>
	);
};

export default UserRoots;
