/* eslint-disable no-unused-vars */
/** @format */
import Event from "../../services/Event";
import { useEffect } from "react";
import { UserNav } from "../components";
import { Outlet } from "react-router-dom";
const UserRoots = () => {
	useEffect(()=>{
		// Event.getEvents()
	},[])
	return (
		<div>
			<UserNav />
			<Outlet />
		</div>
	);
};

export default UserRoots;
