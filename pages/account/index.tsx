import React, { useEffect, useState } from "react";
import styles from "@/styles/Account.module.scss";
import { stylesConfig } from "@/utils/functions";
import { PersonalInfo, Review, SidePane } from "@/components/Account";
import {
	MyAccountSidePaneNavigationItem,
	TNavigationItem,
} from "@/types/MyAccount";
import useAuth from "@/hooks/auth";
import { useRouter } from "next/router";

const classes = stylesConfig(styles, "my-account");

const MyAccountPage: React.FC = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] =
		useState<TNavigationItem>("personal-info");
	const handleTabClick = (tab: MyAccountSidePaneNavigationItem) => {
		setActiveTab(tab.id);
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

	return (
		<main className={classes("")}>
			<SidePane activeTab={activeTab} onClick={handleTabClick} />
			{activeTab === "personal-info" ? (
				<PersonalInfo user={authState.user} />
			) : activeTab === "my-review" ? (
				<Review />
			) : null}
		</main>
	);
};

export default MyAccountPage;
