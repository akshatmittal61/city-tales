import React, { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import { illustration1 } from "@/assets/vectors";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const classes = stylesConfig(styles);

const HomeHeroSection: React.FC<{
	highlights: any[];
}> = ({ highlights }) => {
	const [currAccordianItem, setCurrAccordianItem] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrAccordianItem((prev) => {
				if (prev === highlights.length - 1) {
					return 0;
				} else {
					return prev + 1;
				}
			});
		}, 5000);
		return () => clearInterval(interval);
	}, [highlights.length]);

	return (
		<section className={classes("home-hero")}>
			<div className={classes("home-hero__accordian")}>
				<div
					className={classes("home-hero__accordian__item")}
					style={{
						backgroundImage: `url(${highlights[currAccordianItem].image})`,
					}}
				>
					<Link
						className={classes("home-hero__accordian__content")}
						href={highlights[currAccordianItem].link}
					>
						<h1
							className={classes(
								"home-hero__accordian__content__title"
							)}
						>
							{highlights[currAccordianItem].title}
						</h1>
						<p
							className={classes(
								"home-hero__accordian__content__description"
							)}
						>
							{highlights[currAccordianItem].description}
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
							prev === 0 ? highlights.length - 1 : prev - 1
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
							prev === highlights.length - 1 ? 0 : prev + 1
						);
					}}
				>
					<IoIosArrowForward />
				</button>
				<div className={classes("home-hero__accordian__dots")}>
					{highlights.map((item: any, index: number) => (
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
