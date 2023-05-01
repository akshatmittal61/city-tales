import React from "react";
import { ReviewItem } from "@/interfaces/Review";
import Image from "next/image";
import styles from "./Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import { textureBg } from "@/assets/images";
import { nipDark as nip } from "@/assets/vectors";

const classes = stylesConfig(styles, "reviews-review");

interface ReviewProps extends ReviewItem {
	style?: React.CSSProperties;
}

const Review: React.FC<ReviewProps> = ({ user, content, walk, style }) => {
	return (
		<div
			className={classes("")}
			style={{
				backgroundImage: `url(${textureBg.src})`,
				...style,
			}}
		>
			<div className={classes("__body")}>
				<h5 className={classes("__body--title")}>{walk.title}</h5>
				<p className={classes("__body--content")}>
					&quot;{content}&quot;
				</p>
				<span className={classes("__body--user")}>-{user}</span>
			</div>
			<div className={classes("__image")}>
				<Image
					src={walk.image}
					alt={walk.title}
					width={1920}
					height={1080}
				/>
			</div>
			<Image
				src={nip}
				alt="nip"
				width={60}
				height={60}
				className={classes("__nip")}
			/>
		</div>
	);
};

export default Review;