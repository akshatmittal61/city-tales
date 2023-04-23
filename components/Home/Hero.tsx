import React, { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import { illustration1 } from "@/assets/vectors";
import { carouselItems } from "@/constants/landing";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const classes = stylesConfig(styles);

const HomeHeroSection: React.FC = () => {
	const [currAccordianItem, setCurrAccordianItem] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrAccordianItem((prev) => {
				if (prev === carouselItems.length - 1) {
					return 0;
				} else {
					return prev + 1;
				}
			});
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className={classes("home-hero")}>
			<div className={classes("home-hero__accordian")}>
				<div
					className={classes("home-hero__accordian__item")}
					style={{
						backgroundImage: `url(${carouselItems[currAccordianItem].image})`,
					}}
				>
					<Link
						className={classes("home-hero__accordian__content")}
						href={carouselItems[currAccordianItem].link}
					>
						<h1
							className={classes(
								"home-hero__accordian__content__title"
							)}
						>
							{carouselItems[currAccordianItem].title}
						</h1>
						<p
							className={classes(
								"home-hero__accordian__content__description"
							)}
						>
							{carouselItems[currAccordianItem].description}
						</p>
					</Link>
				</div>
				<button
					className={classes(
						"home-hero__accordian__arrow",
						"home-hero__accordian__arrow--left"
					)}
					onClick={() => {
						setCurrAccordianItem((prev) =>
							prev === 0 ? carouselItems.length - 1 : prev - 1
						);
					}}
				>
					<IoIosArrowBack />
				</button>
				<button
					className={classes(
						"home-hero__accordian__arrow",
						"home-hero__accordian__arrow--right"
					)}
					onClick={() => {
						setCurrAccordianItem((prev) =>
							prev === carouselItems.length - 1 ? 0 : prev + 1
						);
					}}
				>
					<IoIosArrowForward />
				</button>
				<div className={classes("home-hero__accordian__dots")}>
					{carouselItems.map((item, index) => (
						<button
							key={index}
							className={classes(
								"home-hero__accordian__dots__dot",
								index === currAccordianItem
									? "home-hero__accordian__dots__dot--active"
									: ""
							)}
							onClick={() => setCurrAccordianItem(index)}
						/>
					))}
				</div>
			</div>
			<Image
				src={illustration1.src}
				alt="Illustration"
				width={69}
				height={209}
			/>
		</section>
	);
};

export default HomeHeroSection;
