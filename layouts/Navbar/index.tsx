import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import { stylesConfig } from "@/utils/functions";
import { navLinks } from "@/constants/navbar";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";
import useAuth from "@/hooks/auth";
import Button from "@/library/Button";
import { RiMenuFoldLine, RiUserLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { IoIosArrowForward, IoIosMenu } from "react-icons/io";
import GlobalContext from "@/context/GlobalContext";
import { useOnClickOutside } from "@/hooks/mouse-events";

const classNames = stylesConfig(styles, "navbar");

const Navbar: React.FC = () => {
	const router = useRouter();
	const authState = useAuth();
	const navMenuRef = useRef<any>(null);
	const [expandNavMenu, setExpandNavMenu] = useState(false);
	const { logout } = useContext(GlobalContext);
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

	useEffect(() => {
		setExpandNavMenu(false);
	}, [router.pathname]);

	useOnClickOutside(navMenuRef, () => setExpandNavMenu(false));

	return (
		<nav
			className={classNames("", {
				"-expand": expandNavMenu,
			})}
			style={{
				translate: isNavbarVisible
					? "0"
					: "0 calc(-1 * var(--nav-height))",
			}}
		>
			<div className={classNames("-left")}>
				<h1
					className={classNames("-title")}
					onClick={() => router.push("/")}
				>
					City Tales
				</h1>
			</div>
			<button
				className={classNames("-burger")}
				onClick={() => setExpandNavMenu((prev) => !prev)}
			>
				{expandNavMenu ? <RiMenuFoldLine /> : <IoIosMenu />}
			</button>
			<div className={classNames("-right")} ref={navMenuRef}>
				<ul className={classNames("-links")}>
					{navLinks.map(({ link, text }, index) => (
						<li key={index}>
							<Link href={link} className={classNames("-link")}>
								{text}
							</Link>
						</li>
					))}
				</ul>
				{authState.loggedIn ? (
					<div className={classNames("-avatar")}>
						<Avatar src="/vectors/favicon.svg" alt="Avatar" />
						<span className={classNames("-avatar-details")}>
							{authState.user?.name}
							<button onClick={logout}>
								Logout <IoIosArrowForward />
							</button>
						</span>
					</div>
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
