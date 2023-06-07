import React from "react";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import Walk from "./Walk";
import { useRouter } from "next/router";

const classes = stylesConfig(styles, "home-walks");

const HomeWalksSection: React.FC<{
	walks: any[];
}> = ({ walks }) => {
	const router = useRouter();
	return (
		<section className={classes("")}>
			<div className={classes("-header")}>
				<h1 className={classes("-header__title")}>Walks</h1>
			</div>
			<div className={classes("-body")}>
				{walks.slice(0, 2).map((walk, index: number) => (
					<Walk
						key={index}
						style={{
							width: "calc(50% - 20px)",
							margin: "10px 0",
						}}
						{...walk}
						button={{
							text: "View Details",
							action: () => {
								router.push(`/walks/${walk._id}`);
							},
						}}
					/>
				))}
			</div>
		</section>
	);
};

export default HomeWalksSection;
