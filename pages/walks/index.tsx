import Walk from "@/components/Home/Walks/Walk";
import { WalkItem } from "@/components/Home/types";
import { sampleWalks } from "@/constants/landing";
import Responsive from "@/layouts/Responsive";
import styles from "@/styles/Walks.module.scss";
import { IWalk } from "@/types/Walk";
import { fetchAllWalks } from "@/utils/api/walks";
import { randomId, stylesConfig } from "@/utils/functions";
import { useRouter } from "next/router";
import React from "react";

const classes = stylesConfig(styles, "walks");

const WalksPage: React.FC<{ walks: IWalk[] }> = ({ walks }) => {
	const router = useRouter();
	return (
		<main className={classes("")}>
			<div className={classes("-head")}>
				<h1 className={classes("-head-title")}>Walks</h1>
			</div>
			<div className={classes("-body")}>
				<Responsive.Row>
					{walks.map((walk: IWalk) => (
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
								button={{
									text: "View Details",
									action: () => {
										router.push(`/walks/${walk._id}`);
									},
								}}
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
	try {
		const res = await fetchAllWalks();
		return {
			props: { walks: JSON.parse(JSON.stringify(res.data)) },
		};
	} catch (error: any) {
		console.error(error);
		return {
			props: { walks: [] },
		};
	}
};
