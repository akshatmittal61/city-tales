import React from "react";
import { WalkItem } from "../types";
import Image from "next/image";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";

const classes = stylesConfig(styles, "home-walks-walk");

interface WalkProps extends WalkItem {
	style?: React.CSSProperties;
}

const Walk: React.FC<WalkProps> = ({
	id,
	title,
	description,
	image,
	slotsLeft,
	style,
}) => {
	const router = useRouter();
	return (
		<div className={classes("")} style={style}>
			<div className={classes("__content")}>
				<h1 className={classes("__content--title")}>{title}</h1>
				<p className={classes("__content--description")}>
					{description}
				</p>
				<div className={classes("__content--actions")}>
					<Button
						variant="outlined"
						icon={<IoIosArrowForward />}
						iconPosition="right"
						onClick={() => router.push(`/walks/${id}/book-a-tour`)}
						size="small"
					>
						Book Now
					</Button>
					<span className={classes("__content--actions__slots")}>
						{slotsLeft} slots left
					</span>
				</div>
			</div>
			<div className={classes("__image")}>
				<Image src={image} alt={title} width={1920} height={1080} />
			</div>
		</div>
	);
};

export default Walk;
