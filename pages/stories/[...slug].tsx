import React from "react";
import { sampleBlogs } from "@/constants/blogs";
import { Blog } from "@/interfaces/Blog";
import styles from "@/styles/Blog.module.scss";
import { stylesConfig } from "@/utils/functions";
import Button from "@/library/Button";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdBookmark, IoMdShare } from "react-icons/io";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const classes = stylesConfig(styles);

const BlogPage: React.FC<Blog> = ({ title, content, coverImage }) => (
	<div className={classes("blog")}>
		<div
			className={classes("blog-cover")}
			style={{
				backgroundImage: `url(${
					coverImage ? coverImage : "/images/rumi-darwaza.png"
				})`,
			}}
		></div>
		<div className={classes("blog-window")}>
			<div className={classes("blog-header")}>
				<h1 className={classes("blog-header__title")}>{title}</h1>
				<div className={classes("blog-header__actions")}>
					<Button icon={<AiOutlineLike />}>Like</Button>
					<Button icon={<IoMdBookmark />}>Bookmark</Button>
					<Button icon={<IoMdShare />}>Share</Button>
				</div>
			</div>
			<div className={classes("blog-content")}>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					className={classes("blog-content__markdown")}
					linkTarget={"_blank"}
				>
					{content}
				</ReactMarkdown>
			</div>
		</div>
	</div>
);

export default BlogPage;

export const getServerSideProps = async (context: any) => {
	const { params } = context;
	const { slug } = params;
	const id = slug[0];

	try {
		const blog = sampleBlogs.find((blog) => blog.id === id);
		return {
			props: {
				...blog,
				date: blog?.date?.toString(),
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				error: "Something went wrong",
			},
		};
	}
};
