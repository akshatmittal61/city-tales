import { BlogComment } from "@/types/Blog";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Avatar from "@/components/Avatar/Avatar";
import moment from "moment";
import { AiOutlineComment } from "react-icons/ai";
import Button from "@/library/Button";
import { postReplyToComment } from "@/utils/api/blogs";
import useAuth from "@/hooks/auth";

interface BlogCommentPaneProps {
	comment: BlogComment;
	enableReply?: boolean;
}

const classes = stylesConfig(styles, "blog-comment-pane-comments__comment");

const BlogCommentPaneComment: React.FC<BlogCommentPaneProps> = ({
	comment,
	enableReply = true,
}) => {
	const [replies, setReplies] = useState(comment.replies);
	const [showReply, setShowReply] = useState(false);
	const [replyText, setReplyText] = useState("");
	const [postingReply, setPostingReply] = useState(false);
	const len = () => replyText.split(" ").length;
	const authState = useAuth();

	const postReply = async () => {
		try {
			setPostingReply(true);
			const newReply = await postReplyToComment(comment._id, {
				content: replyText,
			});
			setReplies(replies ? [...replies, newReply.data] : [newReply.data]);
		} catch (error) {
			console.error(error);
		} finally {
			setPostingReply(false);
			setReplyText("");
		}
	};

	return (
		<div className={classes("")}>
			<div className={classes("--header")}>
				<div className={classes("--header--avatar")}>
					<Avatar
						src={comment.user.avatar}
						alt={comment.user.name}
						size={40}
					/>
				</div>
				<div className={classes("--header--details")}>
					<span className={classes("--header--details--name")}>
						{comment.user.name}
					</span>
					<span className={classes("--header--details--date")}>
						{moment(comment.date).format("DD MMM YYYY")}
					</span>
				</div>
			</div>
			<div className={classes("--body")}>{comment.content}</div>
			<div className={classes("--footer")}>
				{showReply ? (
					<div className={classes("--footer--replies")}>
						{replies?.map((reply, index) => (
							<BlogCommentPaneComment
								key={index}
								comment={reply}
								enableReply={false}
							/>
						))}
						{authState.loggedIn && enableReply ? (
							<form
								className={classes("--footer-form")}
								onSubmit={(e) => {
									e.preventDefault();
									postReply();
								}}
							>
								<textarea
									className={classes(
										"--footer-form__textarea"
									)}
									value={replyText}
									placeholder={`Reply to ${comment.user.name}'s comment`}
									onChange={(e) =>
										setReplyText(e.target.value)
									}
									disabled={len() > 300}
								/>
								<div className={classes("--footer-form__bar")}>
									<span
										className={classes(
											"--footer-form__words"
										)}
									>
										{len() > 300
											? "300/300 words"
											: len() + "/300 words"}
									</span>
									<Button
										variant="outlined"
										size="small"
										className={classes(
											"--footer-form__button"
										)}
										type="submit"
										loading={postingReply}
									>
										Reply
									</Button>
								</div>
							</form>
						) : null}
					</div>
				) : enableReply ? (
					<>
						<div className={classes("--footer--count")}>
							<AiOutlineComment /> {comment.replies?.length ?? 0}
						</div>
						<div
							className={classes("--footer--reply")}
							onClick={() => setShowReply(true)}
						>
							Replies
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};

export default BlogCommentPaneComment;
