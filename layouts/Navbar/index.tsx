import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import { stylesConfig } from "@/utils/functions";
import { navLinks } from "@/constants/navbar";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";

const classNames = stylesConfig(styles);

const Navbar: React.FC = () => {
	const lastScrollTop = useRef<any>(0);
	const [isNavbarVisible, setIsNavbarVisible] = useState(true);
	const handleScroll = () => {
		const { pageYOffset } = window;
		if (pageYOffset > lastScrollTop.current) setIsNavbarVisible(false);
		else if (pageYOffset < lastScrollTop.current) setIsNavbarVisible(true);
		lastScrollTop.current = pageYOffset;
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<nav
			className={classNames("navbar")}
			style={{
				translate: isNavbarVisible
					? "0"
					: "0 calc(-1 * var(--nav-height))",
			}}
		>
			<ul className={classNames("navbar-links")}>
				{navLinks.map(({ link, text }, index) => (
					<li key={index}>
						<Link href={link} className={classNames("navbar-link")}>
							{text}
						</Link>
					</li>
				))}
			</ul>
			<Avatar src="/vectors/favicon.svg" alt="Avatar" />
		</nav>
	);
};

export default Navbar;
