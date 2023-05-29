import React, { useState } from "react";
import { ReviewItem } from "@/types/Review";
import Image from "next/image";
import styles from "./Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import { textureBg } from "@/assets/images";
import { nipDark as nip } from "@/assets/vectors";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import ReviewPopup from "./ReviewPopup";

const classes = stylesConfig(styles, "reviews-review");

interface ReviewProps extends ReviewItem {
	style?: React.CSSProperties;
}

const Review: React.FC<ReviewProps> = (props) => {
	const { user, content, style, rating } = props;
	const [openPopup, setOpenPopup] = useState(false);
	return (
		<>
			<div
				className={classes("")}
				style={{
					backgroundImage: `url(${textureBg.src})`,
					...style,
				}}
				onClick={() => setOpenPopup(true)}
			>
				<div className={classes("__body")}>
					<h5 className={classes("__body--title")}>{user?.name}</h5>
					<p className={classes("__body--content")}>
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							className={classes("-content__markdown")}
							linkTarget={"_blank"}
						>
							{content}
						</ReactMarkdown>
						{"..."}
					</p>
					<div className={classes("__body--rating")}>
						{[...Array(rating)].map((_, i) =>
							i < rating ? (
								<AiTwotoneStar key={i} width={32} height={32} />
							) : (
								<AiOutlineStar key={i} width={32} height={32} />
							)
						)}
					</div>
				</div>
				{props.image ? (
					<div className={classes("__image")}>
						<Image
							src={props.image}
							alt={user?.name ?? ""}
							width={1920}
							height={1080}
						/>
					</div>
				) : null}
				<Image
					src={nip}
					alt="nip"
					width={60}
					height={60}
					className={classes("__nip")}
				/>
			</div>
			{openPopup ? (
				<ReviewPopup
					review={props}
					onClose={() => setOpenPopup(false)}
				/>
			) : null}
		</>
	);
};

export default Review;
