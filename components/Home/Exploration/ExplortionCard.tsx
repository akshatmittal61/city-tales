import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { ExplorationItem } from "../types";
import useRender from "@/hooks/render";

const classes = stylesConfig(styles, "home-exploration-card");

const ExplorationCard: React.FC<ExplorationItem> = ({
	_id,
	title,
	content,
	coverImage,
	style,
}) => {
	const render = useRender();
	return (
		<div className={classes("")} style={style}>
			<div className={classes("__image")}>
				<Image
					src={coverImage ?? "/images/rumi-darwaza.png"}
					alt={title}
					width={1920}
					height={1080}
				/>
			</div>
			<div className={classes("__content")}>
				<Link
					className={classes("__content--header")}
					href={`/stories/${_id}`}
				>
					{title}
				</Link>
				{render === "client" ? (
					<p
						className={classes("__content--description")}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				) : null}
			</div>
		</div>
	);
};

export default ExplorationCard;
