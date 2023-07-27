import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/admin/styles.module.scss";
import { stylesConfig } from "@/utils/functions";
import useAuth from "@/hooks/auth";
import { useRouter } from "next/router";
import { USER_ROLES } from "@/constants/enum";
import Link from "next/link";
import { toast } from "react-toastify";
import { fetchStats } from "@/utils/api/admin";
import _ from "lodash";
import { textureBg } from "@/assets/images";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const classes = stylesConfig(styles, "admin");

const AdminPage: React.FC = () => {
	const authState = useAuth();
	const router = useRouter();
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getStats = async () => {
			setLoading(true);
			try {
				const globalStats = await fetchStats();
				setStats(globalStats.data);
			} catch (error: any) {
				console.error(error);
				toast.error(error.message ?? "Something went wrong");
			} finally {
				setLoading(false);
			}
		};
		if (authState.user?.role === USER_ROLES.ADMIN) getStats();
	}, [authState.user?.role]);

	useEffect(() => {
		if (!authState.loading) {
			if (!authState.loggedIn) {
				router.push({
					pathname: "/login",
					query: {
						redirect: router.pathname,
					},
				});
			} else {
				if (authState.user?.role !== USER_ROLES.ADMIN) router.push("/");
			}
		}
	}, [authState, router]);

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
		<main
			className={classes("")}
			style={{
				translate: isNavbarVisible
					? "0"
					: "0 calc(-1 * var(--nav-height))",
			}}
		>
			<h1 className={classes("-head")}>Admin Panel</h1>
			<div className={classes("-container")}>
				{loading ? (
					<div className={classes("-loading")}>
						<AiOutlineLoading3Quarters
							className={classes("-loading-icon")}
						/>
					</div>
				) : (
					Object.entries(stats ?? {}).map(([key, value], index) => (
						<div
							className={classes("-block")}
							key={index}
							style={{
								backgroundImage: `url(${textureBg.src})`,
							}}
						>
							<h1 className={classes("-block-head")}>
								{_.startCase(key)}
							</h1>
							<div className={classes("-block-body")}>
								<div className={classes("-block-body__stats")}>
									{Object.entries(value ?? {}).map(
										([key, value], index) => (
											<div
												className={classes(
													"-block-body__stats-item"
												)}
												key={index}
											>
												<h3
													className={classes(
														"-block-body__stats-item--head"
													)}
												>
													{_.startCase(key)}
												</h3>
												<p
													className={classes(
														"-block-body__stats-item--value"
													)}
												>
													{value}
												</p>
											</div>
										)
									)}
								</div>
								<Link
									className={classes("-block-link")}
									href={`/admin/${key}`}
								>
									View All
								</Link>
							</div>
						</div>
					))
				)}
			</div>
		</main>
	);
};

export default AdminPage;
