/** @format */
import { Link } from "react-router-dom";
// import logo from "../assets/solnexus.png";

const NavLogo = () => {
	return (
		<Link to={"/"} className="text-[30px] navlogo">
			{/* <img src={logo} alt="" /> */}
			<h1>solneXus</h1>
		</Link>
	);
};

export default NavLogo;
