import React from "react";
import styles from "./SidePane.module.scss";
import { stylesConfig } from "@/utils/functions";
import { sidePaneNavigation } from "@/constants/MyAcocunt";
import {
	MyAccountSidePaneNavigationItem,
	TNavigationItem,
} from "@/types/MyAccount";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const classes = stylesConfig(styles, "my-account-side-pane");

interface MyAcocuntSidePaneProps {
	activeTab: TNavigationItem;
	onClick: (_: MyAccountSidePaneNavigationItem) => void;
	open?: boolean;
	onOpen?: () => void;
}

const MyAcocuntSidePane: React.FC<MyAcocuntSidePaneProps> = ({
	activeTab,
	onClick,
	open = false,
	onOpen,
}) => {
	return (
		<aside
			className={classes("")}
			style={{
				left: open ? 0 : "calc(-90% + 32px)",
			}}
		>
			<button className={classes("-arrow")} onClick={onOpen}>
				{open ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
			</button>
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
