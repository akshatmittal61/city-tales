import React from "react";
import Navbar from "./Navbar/Navbar";

const Layout: React.FC<any> = ({ children }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
