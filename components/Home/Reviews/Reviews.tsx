import React from "react";
import styles from "./Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import { sampleReviews } from "@/constants/landing";
import Review from "./Review";

const classes = stylesConfig(styles);

const HomeReviewsSection: React.FC = () => {
	return (
		<section className={classes("home-reviews")}>
			<div className={classes("home-reviews-header")}>
				<h1 className={classes("home-reviews-header__title")}>
					Reviews
				</h1>
			</div>
			<div className={classes("home-reviews-body")}>
				{sampleReviews.map((review, index) => (
					<Review key={index} {...review} />
				))}
			</div>
			<div className={classes("home-reviews-foot")}>
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
