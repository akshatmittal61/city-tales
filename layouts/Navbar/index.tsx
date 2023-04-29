import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import { stylesConfig } from "@/utils/functions";
import { navLinks } from "@/constants/navbar";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";
import useAuth from "@/hooks/auth";
import Button from "@/library/Button";
import { RiUserLine } from "react-icons/ri";
import { useRouter } from "next/router";

const classNames = stylesConfig(styles);

const Navbar: React.FC = () => {
	const router = useRouter();
	const authState = useAuth();
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
			<div className={classNames("navbar-left")}>
				<h1 className={classNames("navbar-title")}>City Tales</h1>
			</div>
			<div className={classNames("navbar-right")}>
				<ul className={classNames("navbar-links")}>
					{navLinks.map(({ link, text }, index) => (
						<li key={index}>
							<Link
								href={link}
								className={classNames("navbar-link")}
							>
								{text}
							</Link>
						</li>
					))}
				</ul>
				{authState.loggedIn ? (
					<Avatar src="/vectors/favicon.svg" alt="Avatar" />
				) : (
					<Button
						variant="outlined"
						icon={<RiUserLine />}
						onClick={() => router.push("/login")}
					>
						Login
					</Button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
