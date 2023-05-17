import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import { icons } from "@/assets/icons";
import Link from "next/link";
import { ExplorationItem } from "../types";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

const classes = stylesConfig(styles, "home-exploration-block");

const ExplorationBlock: React.FC<ExplorationItem> = ({
	image,
	title,
	description,
	link,
	style,
}) => {
	const router = useRouter();
	return (
		<div className={classes("")} style={style}>
			<div className={classes("__image")}>
				<Image src={image} alt={title} width={1920} height={1080} />
			</div>
			<div className={classes("__content")}>
				<h2 className={classes("__content--header")}>
					<Image src={icons.map} alt="Map" />
					<Link href={link}>{title}</Link>
				</h2>
				<p className={classes("__content--text")}>{description}</p>
				<Button
					variant="outlined"
					icon={<IoIosArrowForward />}
					iconPosition="right"
					onClick={() => router.push(link)}
				>
					Read More
				</Button>
			</div>
		</div>
	);
};

export default ExplorationBlock;
