import React from "react";
import styles from "./Walks.module.scss";
import { openLink, stylesConfig } from "@/utils/functions";
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
						{...walk}
						key={index}
						button={{
							text: index === 0 ? "Book Now" : "Raise Enquiry",
							action: () => {
								if (index === 0)
									openLink("https://razorpay.com/");
								else if (index === 1)
									router.push(`/walks/${walk.id}/enquiry`);
							},
						}}
						showSlots={index === 0}
					/>
				))}
			</div>
		</section>
	);
};

export default HomeWalksSection;
