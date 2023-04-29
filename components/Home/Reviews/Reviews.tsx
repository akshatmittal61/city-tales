import React from "react";
import styles from "./Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import Review from "./Review";

const classes = stylesConfig(styles, "home-reviews");

const HomeReviewsSection: React.FC<{
	reviews: any[];
}> = ({ reviews }) => {
	return (
		<section className={classes("")}>
			<div className={classes("-header")}>
				<h1 className={classes("-header__title")}>Reviews</h1>
			</div>
			<div className={classes("-body")}>
				{reviews.map((review: any, index: number) => (
					<Review key={index} {...review} />
				))}
			</div>
			<div className={classes("-foot")}>
				<Button
					variant="outlined"
					iconPosition="right"
					icon={<IoIosArrowForward />}
				>
					See All
				</Button>
			</div>
		</section>
	);
};

export default HomeReviewsSection;
