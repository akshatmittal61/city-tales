import React, { useEffect, useState } from "react";
import styles from "@/styles/Account.module.scss";
import { stylesConfig } from "@/utils/functions";
import {
	Bookmarks,
	Events,
	PersonalInfo,
	Review,
	SidePane,
} from "@/components/Account";
import {
	MyAccountSidePaneNavigationItem,
	TNavigationItem,
} from "@/types/MyAccount";
import useAuth from "@/hooks/auth";
import { useRouter } from "next/router";
import Seo from "@/layouts/Seo";

const classes = stylesConfig(styles, "my-account");

const MyAccountPage: React.FC = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [activeTab, setActiveTab] =
		useState<TNavigationItem>("personal-info");
	const handleTabClick = (tab: MyAccountSidePaneNavigationItem) => {
		router.push({
			pathname: "/account",
			query: { tab: tab.id },
		});
		setActiveTab(tab.id);
		setOpen(false);
	};
	const authState = useAuth();

	useEffect(() => {
		if (!authState.loading) {
			if (!authState.loggedIn) {
				router.push({
					pathname: "/login",
					query: { redirect: router.asPath },
				});
			}
		}
	}, [authState, router]);

	useEffect(() => {
		if (router.query.tab) {
			setActiveTab(router.query.tab as any);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.tab]);

	return (
		<main className={classes("")}>
			<Seo title="My Account | City Tales" />
			<SidePane
				activeTab={activeTab}
				onClick={handleTabClick}
				open={open}
				onOpen={() => setOpen((prev) => !prev)}
			/>
			{activeTab === "personal-info" ? (
				<PersonalInfo user={authState.user} />
			) : activeTab === "my-bookmarks" ? (
				<Bookmarks />
			) : activeTab === "my-events" ? (
				<Events />
			) : activeTab === "my-review" ? (
				<Review />
			) : null}
		</main>
	);
};

export default MyAccountPage;
