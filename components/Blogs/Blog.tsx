import React from "react";
import { Blog as BlogProps } from "@/interfaces/Blog";
import Button from "@/library/Button";
import styles from "./Blog.module.scss";
import { stylesConfig } from "@/utils/functions";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { bookmark, nipLight } from "@/assets/vectors";

const classes = stylesConfig(styles);

const Blog: React.FC<BlogProps> = ({ title, content, coverImage, excerpt }) => {
	return (
		<div className={classes("blogs-blog")}>
			<div
				className={classes("blogs-blog__image")}
				style={{
					backgroundImage: `url(${
						coverImage ? coverImage : "/images/rumi-darwaza.png"
					})`,
				}}
			></div>
			<div className={classes("blogs-blog__content")}>
				<h3 className={classes("blogs-blog__content--title")}>
					{title}
				</h3>
				<p className={classes("blogs-blog__content--excerpt")}>
					{excerpt ? excerpt : content.slice(0, 100)}
				</p>
				<Button
					className={classes("blogs-blog__content--button")}
					variant="outlined"
					icon={<IoIosArrowForward />}
					iconPosition="right"
				>
					Read More
				</Button>
			</div>
			<Image
				src={bookmark}
				alt="bookmark"
				width={64}
				height={84}
				className={classes("blogs-blog__bookmark")}
			/>
			<Image
				src={nipLight}
				alt="nip"
				width={52}
				height={52}
				className={classes("blogs-blog__nip")}
			/>
		</div>
	);
};

export default Blog;
