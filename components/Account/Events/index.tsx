import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { bookedWalksSelector } from "@/global/slices/user";
import Responsive from "@/layouts/Responsive";
import Walk from "@/components/Home/Walks/Walk";
import { toast } from "react-toastify";
import { getBookedWalks } from "@/global/helpers/user";
import { textureBg } from "@/assets/images";

const classes = stylesConfig(styles, "my-account-events");

const MyAccountEvents: React.FC = () => {
	const dispatch = useDispatch<any>();
	const bookedEvents = useSelector(bookedWalksSelector);

	useEffect(() => {
		const getEvents = async () => {
			try {
				await dispatch(getBookedWalks());
			} catch (error: any) {
				console.error(error);
				toast.error(error.message);
			}
		};
		getEvents();
	}, [dispatch]);

	return (
		<article className={classes("")}>
			<h1 className={classes("-header")}>My Booked Events</h1>
			<div className={classes("-container")}>
				{bookedEvents && bookedEvents.length > 0 ? (
					<Responsive.Row>
						{bookedEvents?.map((event, index) => (
							<Responsive.Col
								key={event._id + index}
								xlg={100}
								lg={100}
								md={100}
								sm={100}
							>
								<Walk
									{...event}
									style={{
										width: "100%",
										margin: "10px 0",
										backgroundImage: `url(${textureBg.src})`,
									}}
								/>
							</Responsive.Col>
						))}
					</Responsive.Row>
				) : (
					<p className={classes("-container__empty")}>
						You have no booked events.
					</p>
				)}
			</div>
		</article>
	);
};

export default MyAccountEvents;
