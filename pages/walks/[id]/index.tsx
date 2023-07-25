import { IWalk } from "@/types/Walk";
import { bookWalk, fetchWalkById } from "@/utils/api/walks";
import React, { useEffect, useState } from "react";
import styles from "@/styles/walks/Walk.module.scss";
import { openLink, stylesConfig } from "@/utils/functions";
import Button from "@/library/Button";
import { ArrowLeft, Calendar, Clock, MapPin } from "react-feather";
import { useRouter } from "next/router";
import useAuth from "@/hooks/auth";
import moment from "moment";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { toast } from "react-toastify";
import useRender from "@/hooks/render";
import { USER_ROLES, WALK } from "@/constants/enum";
const classes = stylesConfig(styles, "walk");

const WalkDetailsPage: React.FC<{ walk: IWalk; found: boolean }> = (props) => {
	const router = useRouter();
	const authState = useAuth();
	const [booked, setBooked] = useState<
		"null" | "denied" | "pending" | "confirmed"
	>("null");
	const render = useRender();

	useEffect(() => {
		if (
			props.walk.status !== WALK.STATUS.PUBLISHED &&
			authState.role !== USER_ROLES.ADMIN
		)
			router.push("/walks");
	}, [authState.role, props.walk.status, router]);

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
					<h1
						className={classes("-left-header__title")}
						title={title}
					>
						{title}
					</h1>
					<div className={classes("-left-header__actions")}>
						{type === "upcoming" ? (
							<Button
								onClick={() => {
									setBooked("pending");
									if (props.walk.razorpayLink)
										openLink(props.walk.razorpayLink);
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
				{render === "client" ? (
					<p
						className={classes("-left-content")}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				) : null}
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
				{props.walk.map ? (
					<div className={classes("-right-map")}>
						<iframe
							src={props.walk.map}
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				) : null}
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
