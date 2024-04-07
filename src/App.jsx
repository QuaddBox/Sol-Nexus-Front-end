/** @format */
import {
	RouterProvider,
	createRoutesFromElements,
	Route,
	createBrowserRouter,
} from "react-router-dom";

import {
	Contact,
	Event,
	Like,
	Checkout,
	EventDetails,
	Tickets,
} from "./pages";

import "./App.scss";
// import UserRoots from "./layout/UserRoots";
// import SolanaRoots from "./layout/SolanaRoots";
import UserRoots from "./layout/UserRoots";
import "@solana/wallet-adapter-react-ui/styles.css";
import NotFoundPage from "./pages/NotFound";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<UserRoots />}>
					<Route index element={<Event />} />
					<Route path="eventdetails/:id" element={<EventDetails />} />
					<Route path="like" element={<Like />} />
					<Route path="checkout" element={<Checkout />} />
					<Route path="ticket" element={<Tickets />} />
					<Route path="contact" element={<Contact />} />
					<Route path='*' element={<NotFoundPage
					title={"We can't find that page."}
					/>}/>
				</Route>
			</>,
		),
	);
	return (
		<>
			<div>
				<RouterProvider router={router} />
			</div>
		</>
	);
}

export default App;
