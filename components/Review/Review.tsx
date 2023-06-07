import React, { useState } from "react";
import { IReview } from "@/types/Review";
import Image from "next/image";
import styles from "./Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import { textureBg } from "@/assets/images";
import { nipDark as nip } from "@/assets/vectors";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import ReviewPopup from "./ReviewPopup";
import moment from "moment";
import useRender from "@/hooks/render";

const classes = stylesConfig(styles, "reviews-review");

interface ReviewProps extends IReview {
	style?: React.CSSProperties;
}

const Review: React.FC<ReviewProps> = (props) => {
	const { user, content, style, rating, title } = props;
	const [openPopup, setOpenPopup] = useState(false);
	const render = useRender();
	return (
		<>
			<div
				className={classes("")}
				style={{
					backgroundImage: `url(${textureBg.src})`,
					...style,
				}}
				onClick={() => setOpenPopup(true)}
			>
				<div className={classes("__body")}>
					<h5 className={classes("__body--title")}>{title}</h5>
					{render === "client" ? (
						<p
							className={classes("__body--content")}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					) : null}
					<div className={classes("__body--rating")}>
						{[...Array(rating)].map((_, i) =>
							i < rating ? (
								<AiTwotoneStar key={i} width={32} height={32} />
							) : (
								<AiOutlineStar key={i} width={32} height={32} />
							)
						)}
					</div>
					<div className={classes("__body--user")}>
						{user?.avatar ? (
							<div className={classes("__body--user__avatar")}>
								<Image
									src={user?.avatar}
									alt={user?.name ?? ""}
									width={60}
									height={60}
								/>
							</div>
						) : null}
						<div className={classes("__body--user__details")}>
							<h5
								className={classes(
									"__body--user__details--name"
								)}
							>
								{user?.name ?? ""}
							</h5>
							<span
								className={classes(
									"__body--user__details--date"
								)}
							>
								{moment(props.date).format("LL")}
							</span>
						</div>
					</div>
				</div>
				{props.image ? (
					<div className={classes("__image")}>
						<Image
							src={props.image}
							alt={user?.name ?? ""}
							width={1920}
							height={1080}
						/>
					</div>
				) : null}
				<Image
					src={nip}
					alt="nip"
					width={60}
					height={60}
					className={classes("__nip")}
				/>
			</div>
			{openPopup ? (
				<ReviewPopup
					review={props}
					onClose={() => setOpenPopup(false)}
				/>
			) : null}
		</>
	);
};

export default Review;
