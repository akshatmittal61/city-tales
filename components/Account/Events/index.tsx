import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "@/utils/functions";
import { useSelector } from "react-redux";
import { userSelector } from "@/global/slices/user";
import Responsive from "@/layouts/Responsive";
import Walk from "@/components/Home/Walks/Walk";

const classes = stylesConfig(styles, "my-account-events");

const MyAccountEvents: React.FC = () => {
	const user = useSelector(userSelector);
	return (
		<article className={classes("")}>
			<h1 className={classes("-header")}>My Booked Events</h1>
			<div className={classes("-container")}>
				{user?.bookedEvents && user?.bookedEvents?.length > 0 ? (
					<Responsive.Row>
						{user?.bookedEvents?.map((event, index) => (
							<Responsive.Col
								key={event.id + index}
								xlg={33}
								lg={50}
								md={50}
								sm={100}
							>
								<Walk {...event} />
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
