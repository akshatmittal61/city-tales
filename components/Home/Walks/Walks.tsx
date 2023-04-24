import React from "react";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import { WalkProps } from "../types";
import { wallpapers } from "@/assets/images";
import Walk from "./Walk";

const classes = stylesConfig(styles);

const HomeWalksSection: React.FC = () => {
	const sampleWalk: WalkProps = {
		title: "Tour in the stars",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris.",
		image: wallpapers[1].src,
		link: "/",
		slotsLeft: 10,
	};
	return (
		<section className={classes("home-walks")}>
			<div className={classes("home-walks-header")}>
				<h1 className={classes("home-walks-header__title")}>Walks</h1>
			</div>
			<div className={classes("home-walks-body")}>
				<Walk {...sampleWalk} />
				<Walk {...sampleWalk} />
			</div>
		</section>
	);
};

export default HomeWalksSection;
