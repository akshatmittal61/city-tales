import React from "react";
import styles from "./Exploration.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import { icons } from "@/assets/icons";
import Link from "next/link";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { ExplorationItem } from "../types";
import useRender from "@/hooks/render";

const classes = stylesConfig(styles, "home-exploration-block");

const ExplorationBlock: React.FC<ExplorationItem> = ({
	_id,
	title,
	content,
	coverImage,
	style,
}) => {
	const router = useRouter();
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
				<h2 className={classes("__content--header")}>
					<Image src={icons.map} alt="Map" />
					<Link href={`/stories/${_id}`}>{title}</Link>
				</h2>
				{render === "client" ? (
					<p
						className={classes("__content--text")}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				) : null}
				<Button
					variant="outlined"
					icon={<IoIosArrowForward />}
					iconPosition="right"
					onClick={() => router.push(`/stories/${_id}`)}
				>
					Read More
				</Button>
			</div>
		</div>
	);
};

export default ExplorationBlock;
