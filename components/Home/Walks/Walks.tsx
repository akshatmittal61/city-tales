import React from "react";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import Walk from "./Walk";

const classes = stylesConfig(styles);

const HomeWalksSection: React.FC<{
	walks: any[];
}> = ({ walks }) => {
	return (
		<section className={classes("home-walks")}>
			<div className={classes("home-walks-header")}>
				<h1 className={classes("home-walks-header__title")}>Walks</h1>
			</div>
			<div className={classes("home-walks-body")}>
				{walks.map((walk: any, index: number) => (
					<Walk {...walk} key={index} />
				))}
			</div>
		</section>
	);
};

export default HomeWalksSection;
