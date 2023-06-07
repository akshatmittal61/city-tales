import React from "react";
import { Blog as IBlog } from "@/types/Blog";
import Button from "@/library/Button";
import styles from "./BlogCard.module.scss";
import { convertToSlug, stylesConfig } from "@/utils/functions";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { bookmark, nipLight } from "@/assets/vectors";
import { useRouter } from "next/router";

const classes = stylesConfig(styles, "blogs-blog");

interface BlogProps extends IBlog {
	isAdmin?: boolean;
}

const Blog: React.FC<BlogProps> = ({
	id,
	_id,
	title,
	content,
	coverImage,
	excerpt,
	isAdmin = false,
}) => {
	const router = useRouter();

	return (
		<div className={classes("")}>
			<div
				className={classes("__image")}
				style={{
					backgroundImage: `url(${
						coverImage ? coverImage : "/images/rumi-darwaza.png"
					})`,
				}}
			></div>
			<div className={classes("__content")}>
				<h3
					className={classes("__content--title")}
					onClick={() => {
						if (isAdmin) router.push(`/admin/blogs/${id ?? _id}`);
						else
							router.push(
								"/stories/[...slug]",
								`/stories/${id ?? _id}/${convertToSlug(title)}`
							);
					}}
				>
					{title}
				</h3>
				<p className={classes("__content--excerpt")}>
					{excerpt
						? excerpt.length > 150
							? excerpt.slice(0, 150) + "..."
							: excerpt
						: content.slice(0, 150)}
				</p>
				<Button
					className={classes("__content--button")}
					variant="outlined"
					icon={<IoIosArrowForward />}
					iconPosition="right"
					onClick={() => {
						if (isAdmin) router.push(`/admin/blogs/${id ?? _id}`);
						else
							router.push(
								"/stories/[...slug]",
								`/stories/${id ?? _id}/${convertToSlug(title)}`
							);
					}}
				>
					{isAdmin ? "Edit" : "Read More"}
				</Button>
			</div>
			<Image
				src={bookmark}
				alt="bookmark"
				width={64}
				height={84}
				className={classes("__bookmark")}
			/>
			<Image
				src={nipLight}
				alt="nip"
				width={52}
				height={52}
				className={classes("__nip")}
			/>
		</div>
	);
};

export default Blog;
