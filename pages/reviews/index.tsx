import Review from "@/components/Review/Review";
import Responsive from "@/layouts/Responsive";
import styles from "@/styles/Reviews.module.scss";
import { randomId, stylesConfig } from "@/utils/functions";
import React from "react";
import { fetchApprovedReviews } from "@/utils/api/review";
import { IReview } from "@/types/Review";

const classes = stylesConfig(styles, "reviews");

const ReviewsPage: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
	return (
		<main className={classes("")}>
			<div className={classes("-head")}>
				<h1 className={classes("-head-title")}>Reviews</h1>
			</div>
			<div className={classes("-body")}>
				<Responsive.Row>
					{reviews.map((review: any) => (
						<Responsive.Col
							xlg={50}
							lg={50}
							md={100}
							sm={100}
							key={[
								review.user?.toString(),
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
		</main>
	);
};

export default ReviewsPage;

export const getServerSideProps = async () => {
	try {
		const res = await fetchApprovedReviews();
		return {
			props: {
				reviews: JSON.parse(JSON.stringify(res.data)),
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				reviews: [],
			},
		};
	}
};
