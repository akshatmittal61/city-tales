import React, { useState } from "react";
import { sampleBlogs } from "@/constants/blogs";
import { Blog } from "@/types/Blog";
import styles from "@/styles/Blog.module.scss";
import { stylesConfig } from "@/utils/functions";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { IoMdBookmark, IoMdShare } from "react-icons/io";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { CommentPane } from "@/components/Blog";

const classes = stylesConfig(styles, "blog");

const BlogPage: React.FC<Blog> = ({
	title,
	content,
	coverImage,
	comments,
	bookmarked,
}) => {
	const [showCommentPane, setShowCommentPane] = useState(false);
	return (
		<div className={classes("")}>
			<div
				className={classes("-cover")}
				style={{
					backgroundImage: `url(${
						coverImage ? coverImage : "/images/rumi-darwaza.png"
					})`,
				}}
			></div>
			<div className={classes("-window")}>
				<div className={classes("-header")}>
					<h1 className={classes("-header__title")}>{title}</h1>
					<div className={classes("-header__actions")}>
						<button className={classes("-header__actions__button")}>
							<AiOutlineLike />
						</button>
						<button
							className={classes("-header__actions__button")}
							onClick={() => setShowCommentPane(!showCommentPane)}
						>
							<AiOutlineComment />
						</button>
						<button className={classes("-header__actions__button")}>
							<IoMdBookmark />
						</button>
						<button className={classes("-header__actions__button")}>
							<IoMdShare />
						</button>
					</div>
				</div>
				<div className={classes("-content")}>
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						className={classes("-content__markdown")}
						linkTarget={"_blank"}
					>
						{content}
					</ReactMarkdown>
				</div>
			</div>
			{showCommentPane ? (
				<CommentPane
					comments={comments ?? []}
					close={() => setShowCommentPane(false)}
				/>
			) : null}
		</div>
	);
};

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
				comments: blog?.comments?.map((comment) => ({
					...comment,
					date: comment?.date?.toString(),
				})),
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
