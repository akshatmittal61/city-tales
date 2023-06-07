import { IReview } from "@/types/Review";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useOnClickOutside } from "@/hooks/mouse-events";
import { textureBg } from "@/assets/images";
import Image from "next/image";
import moment from "moment";

interface IReviewPopupProps {
	review: IReview;
	onClose: any;
}

const classes = stylesConfig(styles, "reviews-review-popup");

const ReviewPopup: React.FC<IReviewPopupProps> = ({ review, onClose }) => {
	const boxRef = useRef<any>(null);
	useOnClickOutside(boxRef, onClose);
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const lastScrollTop = useRef<any>(0);
	const [isNavbarVisible, setIsNavbarVisible] = useState(true);

	const handleScroll = () => {
		const { pageYOffset } = window;
		if (pageYOffset > lastScrollTop.current) setIsNavbarVisible(false);
		else if (pageYOffset < lastScrollTop.current) setIsNavbarVisible(true);
		lastScrollTop.current = pageYOffset;
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={classes("")}
			style={{
				paddingTop: isNavbarVisible ? "var(--nav-height)" : 0,
			}}
		>
			<div
				className={classes("-box")}
				style={{
					backgroundImage: `url(${textureBg.src})`,
				}}
				ref={boxRef}
				data-aos="zoom-in"
			>
				<button className={classes("-box__close")} onClick={onClose}>
					<IoMdClose />
				</button>
				<div className={classes("-user")}>
					{review.user.avatar ? (
						<div className={classes("-user__avatar")}>
							<Image
								src={review.user.avatar}
								alt={review.user.name}
								width={96}
								height={96}
							/>
						</div>
					) : null}
					<div className={classes("-user__details")}>
						<h2 className={classes("-user__details--name")}>
							{review.user.name}
						</h2>
						<p className={classes("-user__details--date")}>
							{moment(review.date).format("MMMM Do YYYY")}
						</p>
					</div>
				</div>
				<div className={classes("__rating")}>
					{[...Array(review.rating)].map((_, i) =>
						i < review.rating ? (
							<AiTwotoneStar key={i} width={32} height={32} />
						) : (
							<AiOutlineStar key={i} width={32} height={32} />
						)
					)}
				</div>
				<h2 className={classes("__title")}>{review.title}</h2>
				<p
					className={classes("__content")}
					dangerouslySetInnerHTML={{ __html: review.content }}
				/>
			</div>
		</div>
	);
};

export default ReviewPopup;
