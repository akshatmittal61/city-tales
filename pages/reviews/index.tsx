import Review from "@/components/Review/Review";
import { sampleReviews } from "@/constants/reviews";
import { ReviewItem } from "@/types/Review";
import Responsive from "@/layouts/Responsive";
import styles from "@/styles/Reviews.module.scss";
import { randomId, stylesConfig } from "@/utils/functions";
import React, { useEffect, useState } from "react";

const classes = stylesConfig(styles, "reviews");

const ReviewsPage: React.FC<{ reviews: any[] }> = ({ reviews: allReviews }) => {
	const [reviews, setReviews] = useState(new Map());

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
			<div className={classes("-body")}>
				{Array.from(reviews.keys()).map((walkTitle) => (
					<div className={classes("-group")} key={walkTitle}>
						<h2 className={classes("-group-title")}>{walkTitle}</h2>
						<Responsive.Row>
							{reviews
								.get(walkTitle)
								.map((review: ReviewItem) => (
									<Responsive.Col
										xlg={50}
										lg={50}
										md={100}
										sm={100}
										key={[
											review.walk.title,
											review.user,
											review.date,
											randomId(),
											Date.now(),
										].join("-")}
									>
										<Review
											style={{
												width: "calc(100% - 20px)",
												margin: "10px 0",
											}}
											{...review}
										/>
									</Responsive.Col>
								))}
						</Responsive.Row>
					</div>
				))}
			</div>
		</main>
	);
};

export default ReviewsPage;

export const getServerSideProps = async () => {
	return {
		props: {
			reviews: Array(4)
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
