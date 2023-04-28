import React from "react";
import { WalkProps } from "../types";
import Image from "next/image";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";

const classes = stylesConfig(styles);

const Walk: React.FC<WalkProps> = ({
	title,
	description,
	image,
	link,
	slotsLeft,
}) => {
	const router = useRouter();
	return (
		<div className={classes("home-walks-walk")}>
			<div className={classes("home-walks-walk__content")}>
				<h1 className={classes("home-walks-walk__content--title")}>
					{title}
				</h1>
				<p className={classes("home-walks-walk__content--description")}>
					{description}
				</p>
				<div className={classes("home-walks-walk__content--actions")}>
					<Button
						variant="outlined"
						icon={<IoIosArrowForward />}
						iconPosition="right"
						onClick={() => router.push(link)}
						size="small"
					>
						Book Now
					</Button>
					<span
						className={classes(
							"home-walks-walk__content--actions__slots"
						)}
					>
						{slotsLeft} slots left
					</span>
				</div>
			</div>
			<div className={classes("home-walks-walk__image")}>
				<Image src={image} alt={title} width={1920} height={1080} />
			</div>
		</div>
	);
};

export default Walk;
