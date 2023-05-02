import React from "react";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import Walk from "./Walk";

const classes = stylesConfig(styles, "home-walks");

const HomeWalksSection: React.FC<{
	walks: any[];
}> = ({ walks }) => {
	return (
		<section className={classes("")}>
			<div className={classes("-header")}>
				<h1 className={classes("-header__title")}>Walks</h1>
			</div>
			<div className={classes("-body")}>
				{walks.slice(0, 2).map((walk: any, index: number) => (
					<Walk {...walk} key={index} />
				))}
			</div>
		</section>
	);
};

export default HomeWalksSection;
