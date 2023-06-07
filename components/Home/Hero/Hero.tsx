import React, { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import { illustration1 } from "@/assets/vectors";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const classes = stylesConfig(styles, "home-hero");

const HomeHeroSection: React.FC<{
	highlights: any[];
}> = ({ highlights }) => {
	const [currAccordianItem, setCurrAccordianItem] = useState(0);
	const [isClient, setIsClient] = useState(false);

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

	/* useEffect(() => {
		setTimeout(() => {
			setIsClient(true);
		}, 2000);
	}, []); */

	return (
		<section className={classes("")}>
			{/* {isClient ? ( */}
			<div className={classes("__accordian")}>
				<div
					className={classes("__accordian__item")}
					style={{
						backgroundImage: `url(${highlights[currAccordianItem].image})`,
					}}
				>
					<Link
						className={classes("__accordian__content")}
						href={highlights[currAccordianItem].link}
					>
						<h1 className={classes("__accordian__content__title")}>
							{highlights[currAccordianItem].title}
						</h1>
						<p
							className={classes(
								"__accordian__content__description"
							)}
						>
							{highlights[currAccordianItem].description}
						</p>
					</Link>
				</div>
				<button
					className={classes(
						"__accordian__arrow",
						"__accordian__arrow--left"
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
						"__accordian__arrow",
						"__accordian__arrow--right"
					)}
					onClick={() => {
						setCurrAccordianItem((prev) =>
							prev === highlights.length - 1 ? 0 : prev + 1
						);
					}}
				>
					<IoIosArrowForward />
				</button>
				<div className={classes("__accordian__dots")}>
					{highlights.map((item: any, index: number) => (
						<button
							key={index}
							className={classes(
								"__accordian__dots__dot",
								index === currAccordianItem
									? "__accordian__dots__dot--active"
									: ""
							)}
							onClick={() => setCurrAccordianItem(index)}
						/>
					))}
				</div>
			</div>
			{/* ) : null} */}
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
