import React, { useState } from "react";
import { sampleBlogs } from "@/constants/blogs";
import { Blog } from "@/types/Blog";
import styles from "@/styles/Blog.module.scss";
import { stylesConfig } from "@/utils/functions";
import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { CommentPane } from "@/components/Blog";
import { useSelector } from "react-redux";
import { userSelector } from "@/global/slices/user";
import { useRouter } from "next/router";
import useAuth from "@/hooks/auth";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

const classes = stylesConfig(styles, "blog");

const BlogPage: React.FC<Blog> = (props) => {
	const authState = useAuth();
	const user = useSelector(userSelector);
	const router = useRouter();
	const [showCommentPane, setShowCommentPane] = useState(false);
	const [currentStory, setCurrentStory] = useState<Blog>({
		id: props.id,
		title: props.title,
		content: props.content,
		coverImage: props.coverImage,
		comments: props.comments,
		bookmarks: props.bookmarks,
		author: props.author,
		type: props.type,
		status: props.status,
	});

	const handleLike = () => {
		if ((!authState.loading && !authState.loggedIn) || !user) {
			router.push({
				pathname: "/login",
				query: { redirect: router.asPath },
			});
			return;
		}
		setCurrentStory((prev) => ({
			...prev,
			likes: prev.likes?.includes(user)
				? prev.likes?.filter((like) => like !== user)
				: prev.likes?.length
				? [...prev.likes, user]
				: [user],
		}));
	};

	const handleBookmark = () => {
		if ((!authState.loading && !authState.loggedIn) || !user) {
			router.push({
				pathname: "/login",
				query: { redirect: router.asPath },
			});
			return;
		}
		setCurrentStory((prev) => ({
			...prev,
			bookmarks: prev.bookmarks?.includes(user)
				? prev.bookmarks?.filter((bookmark) => bookmark !== user)
				: prev.bookmarks?.length
				? [...prev.bookmarks, user]
				: [user],
		}));
	};

	const handleShare = () => {
		if (typeof window !== "undefined") {
			if (navigator.canShare?.() && navigator.share)
				navigator
					.share({
						title: currentStory.title,
						text: currentStory.content,
						url: window.location.href,
					})
					.then(() => console.log("Successfuly shared"))
					.catch((error) => console.log("Error sharing", error));
			else navigator.clipboard.writeText(window.location.href);
		}
	};

	return (
		<div className={classes("")}>
			<div
				className={classes("-cover")}
				style={{
					backgroundImage: `url(${
						currentStory.coverImage
							? currentStory.coverImage
							: "/images/rumi-darwaza.png"
					})`,
				}}
			></div>
			<div className={classes("-window")}>
				<div className={classes("-header")}>
					<h1 className={classes("-header__title")}>
						{currentStory.title}
					</h1>
					<div className={classes("-header__actions")}>
						<button
							className={classes("-header__actions__button")}
							onClick={handleLike}
						>
							{!user ? (
								<AiOutlineLike />
							) : currentStory.likes?.includes(user) ? (
								<AiFillLike />
							) : (
								<AiOutlineLike />
							)}
						</button>
						<button
							className={classes("-header__actions__button")}
							onClick={() => setShowCommentPane(!showCommentPane)}
						>
							<AiOutlineComment />
						</button>
						<button
							className={classes("-header__actions__button")}
							onClick={handleBookmark}
						>
							{!user ? (
								<RiBookmarkLine />
							) : currentStory.bookmarks?.includes(user) ? (
								<RiBookmarkFill />
							) : (
								<RiBookmarkLine />
							)}
						</button>
						<button
							className={classes("-header__actions__button")}
							onClick={handleShare}
						>
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
						{currentStory.content}
					</ReactMarkdown>
				</div>
			</div>
			{showCommentPane ? (
				<CommentPane
					comments={currentStory.comments ?? []}
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
