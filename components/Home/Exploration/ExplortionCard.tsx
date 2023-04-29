import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { ExplorationItem } from "../types";

const classes = stylesConfig(styles, "home-exploration-card");

const ExplorationCard: React.FC<ExplorationItem> = ({
	image,
	title,
	description,
	link,
	style,
}) => {
	return (
		<div className={classes("")} style={style}>
			<div className={classes("__image")}>
				<Image src={image} alt={title} width={1920} height={1080} />
			</div>
			<div className={classes("__content")}>
				<Link className={classes("__content--header")} href={link}>
					{title}
				</Link>
				<p className={classes("__content--description")}>
					{description}
				</p>
			</div>
		</div>
	);
};

export default ExplorationCard;
