import React from "react";
import { ReviewItem } from "../types";
import Image from "next/image";
import styles from "./Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import { textureBg } from "@/assets/images";
import { nip } from "@/assets/vectors";

const classes = stylesConfig(styles, "home-reviews-review");

const Review: React.FC<ReviewItem> = ({ user, content, image, title }) => {
	return (
		<div
			className={classes("")}
			style={{
				backgroundImage: `url(${textureBg.src})`,
			}}
		>
			<div className={classes("__body")}>
				<h5 className={classes("__body--title")}>{title}</h5>
				<p className={classes("__body--content")}>
					&quot;{content}&quot;
				</p>
				<span className={classes("__body--user")}>-{user}</span>
			</div>
			<div className={classes("__image")}>
				<Image src={image} alt={title} width={1920} height={1080} />
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
