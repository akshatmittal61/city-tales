import { IWalk } from "@/types/Walk";
import { bookWalk, fetchWalkById } from "@/utils/api/walks";
import React, { useState } from "react";
import styles from "@/styles/walks/Walk.module.scss";
import { openLink, stylesConfig } from "@/utils/functions";
import Button from "@/library/Button";
import { ArrowLeft, Calendar, Clock, MapPin } from "react-feather";
import { useRouter } from "next/router";
import useAuth from "@/hooks/auth";
import moment from "moment";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { toast } from "react-toastify";
const classes = stylesConfig(styles, "walk");

const WalkDetailsPage: React.FC<{ walk: IWalk; found: boolean }> = (props) => {
	const router = useRouter();
	const authState = useAuth();
	const [booked, setBooked] = useState<
		"null" | "denied" | "pending" | "confirmed"
	>("null");
	console.log(props.walk);

	if (!props.found)
		return (
			<div className={classes("-not-found")}>
				<h2 className={classes("-not-found__title")}>Error 404</h2>
				<h4 className={classes("-not-found__subtitle")}>
					Walk Not Found
				</h4>
				<Button
					onClick={() => router.push("/walks")}
					icon={<ArrowLeft />}
					iconPosition="left"
				>
					Go Back to Walks
				</Button>
			</div>
		);
	const { title, content, location, type } = props.walk;
	const blocks = [
		{
			title: "Location",
			content: location,
			icon: <MapPin />,
			type: ["upcoming", "available"],
		},
		{
			title: "Date",
			content: moment(props.walk.date).format("DD MMMM YYYY"),
			icon: <Calendar />,
			type: ["upcoming"],
		},
		{
			title: "Time",
			content: moment(props.walk.date).format("hh:mm A"),
			icon: <Clock />,
			type: ["upcoming"],
		},
		{
			title: "Price",
			content: `₹${props.walk.price}`,
			icon: <AiOutlineMoneyCollect />,
			type: ["upcoming"],
		},
		{
			title: "Duration",
			content: `${props.walk.duration} hours`,
			icon: <Clock />,
			type: ["available"],
		},
	];

	const bookAWalk = async () => {
		if (!authState.loggedIn) {
			router.push({
				pathname: "/login",
				query: {
					redirect: `/walks/${router.query.id}/enquiry`,
				},
			});
			return;
		}
		try {
			await bookWalk(props.walk._id);
			setBooked("confirmed");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<main className={classes("")}>
			<div className={classes("-left")}>
				<div className={classes("-left-header")}>
					<h1 className={classes("-left-header__title")}>{title}</h1>
					<div className={classes("-left-header__actions")}>
						{type === "upcoming" ? (
							<Button
								onClick={() => {
									setBooked("pending");
									openLink("https://rzp.io/l/2Z0Z1X1");
								}}
								variant="filled"
							>
								Book Now
							</Button>
						) : (
							<Button
								variant="outlined"
								onClick={() => {
									if (authState.loggedIn)
										router.push(
											`/walks/${router.query.id}/enquiry`
										);
									else
										router.push({
											pathname: "/login",
											query: {
												redirect: `/walks/${router.query.id}/enquiry`,
											},
										});
								}}
							>
								Enquire Now
							</Button>
						)}
					</div>
				</div>
				{booked === "pending" ? (
					<div className={classes("-left-confirmation")}>
						<span className={classes("-left-confirmation__title")}>
							Did you booked the tour?
						</span>
						<div className={classes("-left-confirmation__actions")}>
							<Button
								variant="outlined"
								onClick={() => setBooked("denied")}
								size="small"
							>
								No
							</Button>
							<Button
								onClick={() => bookAWalk()}
								variant="filled"
								size="small"
							>
								Yes
							</Button>
						</div>
					</div>
				) : null}
				<p className={classes("-left-content")}>{content}</p>
				{
					<div className={classes("-left-blocks")}>
						{blocks.map((block) => {
							if (block.type.includes(type))
								return (
									<div
										className={classes(
											"-left-blocks__block"
										)}
									>
										<div
											className={classes(
												"-left-blocks__block-icon"
											)}
										>
											{block.icon}
										</div>
										<div
											className={classes(
												"-left-blocks__block-content"
											)}
										>
											<h3
												className={classes(
													"-left-blocks__block-title"
												)}
											>
												{block.title}
											</h3>
											<p
												className={classes(
													"-left-blocks__block-content"
												)}
											>
												{block.content}
											</p>
										</div>
									</div>
								);
						})}
					</div>
				}
			</div>
			<div className={classes("-right")}>
				<div
					className={classes("-right-image")}
					style={{
						backgroundImage: `url(${props.walk.coverImage})`,
					}}
				></div>
				<div className={classes("-right-map")}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1685455271389!5m2!1sen!2sin"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
			</div>
		</main>
	);
};

export default WalkDetailsPage;

export const getServerSideProps = async (context: any) => {
	const { id } = context.query;
	try {
		const res = await fetchWalkById(id);
		return {
			props: {
				walk: JSON.parse(JSON.stringify(res.data)),
				found: true,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				walk: null,
				found: false,
			},
		};
	}
};
