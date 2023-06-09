import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import ExplorationBlock from "./ExplorationBlock";
import ExplorationCard from "./ExplortionCard";
import Button from "@/library/Button";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";

const classes = stylesConfig(styles, "home-exploration");

const HomeExplorationSection: React.FC<{
	explorations: any[];
}> = ({ explorations }) => {
	const router = useRouter();

	return (
		<section className={classes("")}>
			<h1 className={classes("-header")}>Explorations</h1>
			<div className={classes("-blocks")}>
				{explorations.length > 0 ? (
					<ExplorationBlock {...explorations[0]} />
				) : null}
				{explorations.length > 1 ? (
					<ExplorationBlock {...explorations[1]} />
				) : null}
			</div>
			<div className={classes("-cards")}>
				{explorations.length > 2
					? explorations
							.slice(2)
							.map((exploration, i) => (
								<ExplorationCard {...exploration} key={i} />
							))
					: null}
			</div>
			<Button
				variant="outlined"
				icon={<IoIosArrowForward />}
				iconPosition="right"
				onClick={() => router.push("/stories")}
			>
				See All
			</Button>
		</section>
	);
};

export default HomeExplorationSection;
