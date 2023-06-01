import React, { useEffect, useRef, useState } from "react";
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
import { useOnClickOutside } from "@/hooks/mouse-events";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/global/helpers/user";
import { primaryLogo4 } from "@/assets/vectors";
import { USER_ROLES } from "@/constants/enum";

const classNames = stylesConfig(styles, "navbar");

const Navbar: React.FC = () => {
	const router = useRouter();
	const authState = useAuth();
	const navMenuRef = useRef<any>(null);
	const [expandNavMenu, setExpandNavMenu] = useState(false);
	const dispatch = useDispatch<any>();
	console.log(authState, authState.role === USER_ROLES.ADMIN);

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

	const logout = async () => {
		try {
			await dispatch(logoutUser());
		} catch (error) {
			console.error(error);
		}
	};

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
				<Avatar
					src={primaryLogo4}
					alt="City-Tales"
					onClick={() => router.push("/")}
				/>
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
					{authState.role === USER_ROLES.ADMIN ? (
						<li>
							<Link href="/admin" className={classNames("-link")}>
								Admin panel
							</Link>
						</li>
					) : null}
				</ul>
				{authState.loggedIn ? (
					<div className={classNames("-avatar")}>
						<Avatar
							src={
								authState.user.avatar
									? authState.user.avatar
									: "/vectors/favicon.svg"
							}
							alt="Avatar"
							onClick={() =>
								router.push({
									pathname: "/account",
									query: {
										tab: "personal-info",
									},
								})
							}
						/>
						<span className={classNames("-avatar-details")}>
							<span
								onClick={() =>
									router.push({
										pathname: "/account",
										query: {
											tab: "personal-info",
										},
									})
								}
							>
								{authState.user?.name}
							</span>
							<button
								onClick={(e) => {
									e.preventDefault();
									logout();
								}}
							>
								Logout <IoIosArrowForward />
							</button>
						</span>
					</div>
				) : (
					<Button
						variant="outlined"
						icon={<RiUserLine />}
						onClick={() =>
							router.push({
								pathname: "/login",
								query: { redirect: router.pathname },
							})
						}
					>
						Login
					</Button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
