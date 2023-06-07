import React from "react";
import Image from "next/image";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import { IWalk } from "@/types/Walk";
import { useRouter } from "next/router";

const classes = stylesConfig(styles, "home-walks-walk");

interface WalkProps extends IWalk {
	style?: React.CSSProperties;
	button?: {
		text: string;
		action: any;
	};
	showSlots?: boolean;
}

const Walk: React.FC<WalkProps> = ({
	title,
	content,
	coverImage,
	slots,
	style,
	type,
	_id,
}) => {
	const router = useRouter();
	return (
		<div className={classes("")} style={style}>
			<div className={classes("__content")}>
				<h1 className={classes("__content--title")}>{title}</h1>
				<p
					className={classes("__content--description")}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
				<div className={classes("__content--actions")}>
					<Button
						variant="outlined"
						icon={<IoIosArrowForward />}
						iconPosition="right"
						onClick={() => {
							router.push(`/walks/${_id}`);
						}}
						size="small"
					>
						View Details
					</Button>
					{type === "upcoming" ? (
						<span className={classes("__content--actions__slots")}>
							{slots} slots left
						</span>
					) : null}
				</div>
			</div>
			<div className={classes("__image")}>
				<Image
					src={coverImage}
					alt={title}
					width={1920}
					height={1080}
				/>
			</div>
		</div>
	);
};

export default Walk;
