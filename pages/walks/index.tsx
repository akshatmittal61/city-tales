import Walk from "@/components/Home/Walks/Walk";
import { WalkItem } from "@/components/Home/types";
import { sampleWalks } from "@/constants/landing";
import Responsive from "@/layouts/Responsive";
import styles from "@/styles/Walks.module.scss";
import { randomId, stylesConfig } from "@/utils/functions";
import React from "react";

const classes = stylesConfig(styles, "walks");

const WalksPage: React.FC<{ walks: any[] }> = ({ walks }) => {
	return (
		<main className={classes("")}>
			<div className={classes("-head")}>
				<h1 className={classes("-head-title")}>Walks</h1>
			</div>
			<div className={classes("-body")}>
				<Responsive.Row>
					{walks.map((walk: WalkItem) => (
						<Responsive.Col
							xlg={50}
							lg={50}
							md={100}
							sm={100}
							key={[walk.title, randomId(), Date.now()].join("-")}
						>
							<Walk
								style={{
									width: "calc(100% - 20px)",
									margin: "10px 0",
								}}
								{...walk}
							/>
						</Responsive.Col>
					))}
				</Responsive.Row>
			</div>
		</main>
	);
};

export default WalksPage;

export const getServerSideProps = async () => {
	return {
		props: {
			walks: sampleWalks,
		},
	};
};
