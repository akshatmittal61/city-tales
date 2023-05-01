import { sampleWalks } from "@/constants/landing";
import React, { useState } from "react";
import styles from "@/styles/BookTour.module.scss";
import { randomId, stylesConfig } from "@/utils/functions";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { sampleReviews } from "@/constants/reviews";
import Responsive from "@/layouts/Responsive";
import Input from "@/library/Input";
import Button from "@/library/Button";

const classes = stylesConfig(styles, "book-tour");

const BookATourPage: React.FC<{ walk: any; reviews: any[] }> = ({
	walk,
	reviews,
}) => {
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		phone: "",
		visitors: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(userDetails);
	};

	return (
		<main className={classes("")}>
			<article className={classes("-details")}>
				<div className={classes("-details-header")}>
					<h1 className={classes("-details-header__title")}>
						Details
					</h1>
					<span className={classes("-details-header__subtitle")}>
						Fill the details and send an enquiry via email
					</span>
				</div>
				<form
					onSubmit={handleSubmit}
					className={classes("-details-form")}
				>
					<Input
						placeholder="Name"
						value={userDetails.name}
						onChange={handleChange}
						name="name"
					/>
					<Input
						placeholder="Email"
						value={userDetails.email}
						onChange={handleChange}
						name="email"
					/>
					<Input
						placeholder="Phone No. (with area code)"
						value={userDetails.phone}
						onChange={handleChange}
						name="phone"
					/>
					<Input
						placeholder="No. of Visitors"
						value={userDetails.visitors}
						onChange={handleChange}
						name="visitors"
						type="number"
						min={1}
					/>
					<Button variant="outlined">Send Email</Button>
				</form>
			</article>
			<aside
				className={classes("-reviews")}
				style={{
					backgroundImage: `url(${walk.image})`,
				}}
			>
				<div className={classes("-reviews-header")}>
					<h1 className={classes("-reviews-header__title")}>
						Reviews
					</h1>
					<Link href={"/reviews"}>
						See All <IoIosArrowForward />
					</Link>
				</div>
				<div className={classes("-reviews-body")}>
					<Responsive.Row>
						{reviews.map((review) => (
							<Responsive.Col
								xlg={50}
								lg={50}
								md={100}
								sm={100}
								key={[
									review.walk.title,
									review.user.name,
									randomId(),
									Date.now(),
								].join("-")}
							>
								<div className={classes("-reviews__review")}>
									<h4
										className={classes(
											"-reviews__review--title"
										)}
									>
										{review.walk.title}
									</h4>
									<p
										className={classes(
											"-reviews__review--text"
										)}
									>
										&quot;{review.content.slice(0, 100)}...
									</p>
									<span
										className={classes(
											"-reviews__review--user"
										)}
									>
										- {review.user}
									</span>
								</div>
							</Responsive.Col>
						))}
					</Responsive.Row>
				</div>
			</aside>
		</main>
	);
};

export default BookATourPage;

export const getServerSideProps = async (context: any) => {
	const { id } = context.query;
	try {
		if (id) {
			const walk = sampleWalks.find((walk) => walk.id === id);
			if (walk) {
				const reviews = sampleReviews.filter(
					(review) => review.walk.id === id
				);
				return {
					props: {
						walk: walk,
						reviews: Array(10)
							.fill(reviews)
							.flat()
							?.map((review: any) => ({
								...review,
								date: review.date.toISOString(),
							})),
					},
				};
			}
		}
	} catch (error) {
		console.error(error);
		return {
			props: {
				walk: null,
				reviews: [],
			},
		};
	}
};
