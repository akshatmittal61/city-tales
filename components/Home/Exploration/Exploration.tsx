import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import { ExplorationItem } from "../types";
import ExplorationBlock from "./ExplorationBlock";
import { wallpapers } from "@/assets/images";
import ExplorationCard from "./ExplortionCard";
import Button from "@/library/Button";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";

const classes = stylesConfig(styles);

const HomeExplorationSection: React.FC = () => {
	const sampleItem: ExplorationItem = {
		image: wallpapers[0].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	};
	const router = useRouter();
	return (
		<section className={classes("home-exploration")}>
			<h1 className={classes("home-exploration-header")}>Explorations</h1>
			<div className={classes("home-exploration-blocks")}>
				<ExplorationBlock
					{...sampleItem}
					style={{
						flexDirection: "row-reverse",
					}}
				/>
				<ExplorationBlock {...sampleItem} />
			</div>
			<div className={classes("home-exploration-cards")}>
				{Array(7)
					.fill(0)
					.map((_, i) => (
						<ExplorationCard {...sampleItem} key={i} />
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
