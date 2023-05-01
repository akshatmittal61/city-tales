import { sampleReviews } from "@/constants/reviews";
import styles from "@/styles/Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import React, { useEffect, useState } from "react";

const classes = stylesConfig(styles, "reviews");

const ReviewsPage: React.FC<{ reviews: any[] }> = ({ reviews: allReviews }) => {
	const [, setReviews] = useState(new Map());

	useEffect(() => {
		const reviewsMap = new Map();
		allReviews.forEach((review) => {
			const walkTitle = review.walk.title;
			if (reviewsMap.has(walkTitle)) {
				reviewsMap.get(walkTitle).push(review);
			} else {
				reviewsMap.set(walkTitle, [review]);
			}
		});
		setReviews(reviewsMap);
	}, [allReviews]);

	return (
		<main className={classes("")}>
			<div className={classes("-head")}>
				<h1 className={classes("-head-title")}>Reviews</h1>
			</div>
			<div className={classes("-body")}></div>
		</main>
	);
};

export default ReviewsPage;

export const getServerSideProps = async () => {
	return {
		props: {
			reviews: Array(11)
				.fill(
					sampleReviews.map((review) => ({
						...review,
						id: Math.random().toString(36).substr(2, 9),
						date: review.date?.toString() ?? "2000-01-01",
					}))
				)
				.flat(),
		},
	};
};
