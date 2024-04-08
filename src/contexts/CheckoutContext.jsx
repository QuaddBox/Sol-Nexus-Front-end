/* eslint-disable react/prop-types */
/** @format */

import { createContext, useEffect, useState } from "react";

export const CheckoutContext = createContext();


export const CheckoutProvider = ({ children }) => {
	const [checkoutEvents, setCheckoutEvents] = useState([]);

	useEffect(() => {
		const storedCheckoutEvents = JSON.parse(
			localStorage.getItem("checkoutevents"),
		);
		if (storedCheckoutEvents) {
			setCheckoutEvents(storedCheckoutEvents);
		}
	}, []);

	const addToCheckout = (event) => {
		const updatedCheckoutEvents = [...checkoutEvents, event];
		setCheckoutEvents(updatedCheckoutEvents);
		localStorage.setItem(
			"checkoutevents",
			JSON.stringify(updatedCheckoutEvents),
		);
	};

	const removeFromCheckout = (id) => {
		const updatedCheckoutEvents = checkoutEvents.filter(
			(item) => item.id !== id,
		);
		setCheckoutEvents(updatedCheckoutEvents);

		localStorage.setItem(
			"checkoutevents",
			JSON.stringify(updatedCheckoutEvents),
		);
	};

	return (
		<CheckoutContext.Provider
			value={{ checkoutEvents, addToCheckout, removeFromCheckout }}>
			{children}
		</CheckoutContext.Provider>
	);
};
