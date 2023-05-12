import React from "react";
import styles from "./SidePane.module.scss";
import { stylesConfig } from "@/utils/functions";
import { sidePaneNavigation } from "@/constants/MyAcocunt";
import {
	MyAccountSidePaneNavigationItem,
	TNavigationItem,
} from "@/types/MyAccount";

const classes = stylesConfig(styles, "my-account-side-pane");

interface MyAcocuntSidePaneProps {
	activeTab: TNavigationItem;
	onClick: (_: MyAccountSidePaneNavigationItem) => void;
}

const MyAcocuntSidePane: React.FC<MyAcocuntSidePaneProps> = ({
	activeTab,
	onClick,
}) => {
	return (
		<aside className={classes("")}>
			<h1 className={classes("-header")}>My Account</h1>
			<ul className={classes("-list")}>
				{sidePaneNavigation.map((item, index) => (
					<li
						className={classes("-list__item", {
							"-list__item--active": activeTab === item.id,
						})}
						key={index}
						onClick={() => onClick(item)}
					>
						<span className={classes("-list__item--icon")}>
							{item.icon}
						</span>
						<span className={classes("-list__item--label")}>
							{item.label}
						</span>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default MyAcocuntSidePane;
