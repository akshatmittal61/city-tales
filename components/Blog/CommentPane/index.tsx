import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { BlogComment } from "@/types/Blog";
import { useOnClickOutside } from "@/hooks/mouse-events";
import Button from "@/library/Button";
import { toast } from "react-toastify";
import { postComment } from "@/utils/api/blogs";
import BlogCommentPaneComment from "./Comment";
import useAuth from "@/hooks/auth";
import { useRouter } from "next/router";

interface BlogCommentPaneProps {
	blogId: string;
	comments: BlogComment[];
	setComments: any;
	close: () => void;
}

const classes = stylesConfig(styles, "blog-comment-pane");

const BlogCommentPane: React.FC<BlogCommentPaneProps> = ({
	blogId,
	comments,
	setComments,
	close,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const authState = useAuth();
	const router = useRouter();
	const [myComment, setMyComment] = useState("");
	useOnClickOutside(ref, close);

	const handlePostComment = async () => {
		try {
			const newComment = await postComment(blogId, {
				content: myComment,
			});
			setComments([...comments, newComment.data]);
			setMyComment("");
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "An error occurred");
		}
	};

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
			ref={ref}
			style={{
				translate: isNavbarVisible
					? "0"
					: "0 calc(-1 * var(--nav-height))",
				height: isNavbarVisible
					? "100%"
					: "calc(100% + var(--nav-height))",
			}}
		>
			<h1 className={classes("-header")}>
				Discussion ({comments.length})
			</h1>
			{authState.loggedIn ? (
				<form
					className={classes("-form")}
					onSubmit={(e) => {
						e.preventDefault();
						handlePostComment();
					}}
				>
					<textarea
						className={classes("-form__textarea")}
						placeholder="Share your thoughts..."
						onChange={(e) => setMyComment(e.target.value)}
						value={myComment}
						disabled={myComment.split(" ").length > 300}
					></textarea>
					<div className={classes("-form__foot")}>
						<span className={classes("-form__side")}>
							{myComment.split(" ").length > 300
								? "300/300 words"
								: `${myComment.split(" ").length}/300 words`}
						</span>
						<Button variant="outlined" size="small" type="submit">
							Post
						</Button>
					</div>
				</form>
			) : (
				<Button
					variant="outlined"
					style={{
						width: "100%",
					}}
					onClick={() => {
						router.push({
							pathname: "/login",
							query: {
								redirect: router.asPath,
							},
						});
					}}
				>
					Login to post your Comment
				</Button>
			)}
			<div className={classes("-comments")}>
				{comments.map((comment, index) => (
					<BlogCommentPaneComment
						blogId={blogId}
						comment={comment}
						key={index}
						enableReply={true}
						onDelete={(id: string) => {
							setComments(
								comments.filter((comment) => comment._id !== id)
							);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default BlogCommentPane;
