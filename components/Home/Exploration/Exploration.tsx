import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import ExplorationBlock from "./ExplorationBlock";
import { sampleExplorationItem } from "@/constants/landing";
import ExplorationCard from "./ExplortionCard";
import Button from "@/library/Button";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";

const classes = stylesConfig(styles);

const HomeExplorationSection: React.FC = () => {
	const router = useRouter();

	return (
		<section className={classes("home-exploration")}>
			<h1 className={classes("home-exploration-header")}>Explorations</h1>
			<div className={classes("home-exploration-blocks")}>
				<ExplorationBlock
					{...sampleExplorationItem}
					style={{
						flexDirection: "row-reverse",
					}}
				/>
				<ExplorationBlock {...sampleExplorationItem} />
			</div>
			<div className={classes("home-exploration-cards")}>
				{Array(7)
					.fill(0)
					.map((_, i) => (
						<ExplorationCard {...sampleExplorationItem} key={i} />
					))}
			</div>
			<Button
				variant="outlined"
				icon={<IoIosArrowForward />}
				iconPosition="right"
				onClick={() => router.push("/explorations")}
			>
				See All
			</Button>
		</section>
	);
};

export default HomeExplorationSection;
