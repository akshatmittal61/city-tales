import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { ExplorationItem } from "../types";

const classes = stylesConfig(styles);

const ExplorationCard: React.FC<ExplorationItem> = ({
	image,
	title,
	description,
	link,
	style,
}) => {
	return (
		<div className={classes("home-exploration-card")} style={style}>
			<div className={classes("home-exploration-card__image")}>
				<Image src={image} alt={title} width={1920} height={1080} />
			</div>
			<div className={classes("home-exploration-card__content")}>
				<Link
					className={classes(
						"home-exploration-card__content--header"
					)}
					href={link}
				>
					{title}
				</Link>
				<p
					className={classes(
						"home-exploration-card__content--description"
					)}
				>
					{description}
				</p>
			</div>
		</div>
	);
};

export default ExplorationCard;
