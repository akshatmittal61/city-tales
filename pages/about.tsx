import React from "react";
import styles from "@/styles/About.module.scss";
import { stylesConfig } from "@/utils/functions";
import { aboutPoster } from "@/assets/images";
import { frame } from "@/assets/vectors";
import Image from "next/image";
import Seo from "@/layouts/Seo";

const classes = stylesConfig(styles, "about");

const AbouPage: React.FC = () => {
	return (
		<main className={classes("")}>
			<Seo title="About City tales" />
			<section className={classes("-hero")}>
				<div className={classes("-hero-graphic")}>
					<div
						className={classes("-hero-graphic__frame")}
						style={{
							backgroundImage: `url(${aboutPoster})`,
						}}
					>
						<Image
							src={frame.src}
							alt="about"
							width={1920}
							height={1080}
						/>
					</div>
				</div>
				<div className={classes("-hero-content")}>
					<h1 className={classes("-hero-title")}>City Tales</h1>
					<p className={classes("-hero-text")}>
						Rameen Khan has been exploring/researching/writing about
						the history and heritage of cities ( as well as towns)
						of India since 2018. He is passionate about diverse
						aspects of the field including architecture, coins, art,
						archival views etc which enable him to give a more
						rounded view of our built heritage He runs the page City
						Tales where he documents his work. City Tales today has
						around 120k followers on social media. The coverage is
						of 130 places in 13 states. Delhi, however, will always
						be his first love.
					</p>
				</div>
			</section>
			<section className={classes("-more")}>
				<h2 className={classes("-more-title")}>More about me</h2>
				<p className={classes("-more-text")}>
					Rameen Khan has been exploring/researching/writing about the
					history and heritage of cities ( as well as towns) of India
					since 2018. He is passionate about diverse aspects of the
					field including architecture, coins, art, archival views etc
					which enable him to give a more rounded view of our built
					heritage He runs the page City Tales where he documents his
					work. City Tales today has around 120k followers on social
					media. The coverage is of 130 places in 13 states. Delhi,
					however, will always be his first love. Rameen Khan has been
					exploring/researching/writing about the history and heritage
					of cities ( as well as towns) of India since 2018. He is
					passionate about diverse aspects of the field including
					architecture, coins, art, archival views etc which enable
					him to give a more rounded view of our built heritage He
					runs the page City Tales where he documents his work. City
					Tales today has around 120k followers on social media. The
					coverage is of 130 places in 13 states. Delhi, however, will
					always be his first love.Rameen Khan has been
					exploring/researching/writing about the history and heritage
					of cities ( as well as towns) of India since 2018. He is
					passionate about diverse aspects of the field including
					architecture, coins, art, archival views etc which enable
					him to give a more rounded view of our built heritage He
					runs the page City Tales where he documents his work. City
					Tales today has around 120k followers on social media. The
					coverage is of 130 places in 13 states. Delhi, however, will
					always be his first love.Rameen Khan has been
					exploring/researching/writing about the history and heritage
					of cities ( as well as towns) of India since 2018. He is
					passionate about diverse aspects of the field including
					architecture, coins, art, archival views etc which enable
					him to give a more rounded view of our built heritage He
					runs the page City Tales where he documents his work. City
					Tales today has around 120k followers on social media. The
					coverage is of 130 places in 13 states. Delhi, however, will
					always be his first love.
				</p>
			</section>
		</main>
	);
};

export default AbouPage;
