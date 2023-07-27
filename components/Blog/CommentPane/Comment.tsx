import { BlogComment } from "@/types/Blog";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Avatar from "@/components/Avatar/Avatar";
import moment from "moment";
import { AiOutlineComment, AiOutlineDelete } from "react-icons/ai";
import Button from "@/library/Button";
import { deleteComment, postReplyToComment } from "@/utils/api/blogs";
import useAuth from "@/hooks/auth";
import { useConfirmationModal } from "@/components/Confirmation";
import { USER_ROLES } from "@/constants/enum";

interface BlogCommentPaneProps {
	blogId: string;
	comment: BlogComment;
	enableReply?: boolean;
	onDelete: (_: string) => void;
}

const classes = stylesConfig(styles, "blog-comment-pane-comments__comment");

const BlogCommentPaneComment: React.FC<BlogCommentPaneProps> = ({
	blogId,
	comment,
	enableReply = true,
	onDelete = () => {},
}) => {
	const [replies, setReplies] = useState(comment.replies);
	const [showReply, setShowReply] = useState(false);
	const [replyText, setReplyText] = useState("");
	const [postingReply, setPostingReply] = useState(false);
	const [, setDeletingComment] = useState(false);
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

	const deleteThisComment = async () => {
		try {
			setDeletingComment(true);
			await deleteComment(blogId, comment._id);
			onDelete(comment._id);
		} catch (error) {
			console.error(error);
		} finally {
			setDeletingComment(false);
		}
	};

	const deleteCommentConfirmation = useConfirmationModal(
		`Delete ${comment.user.name}'s comment`,
		`Are you sure you want to delete ${comment.content.substr(0, 10)}...?`,
		deleteThisComment,
		() => {}
	);

	return (
		<>
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
					{authState.loggedIn &&
					(authState.user?.role === USER_ROLES.ADMIN ||
						authState.user?._id === comment.user._id) ? (
						<button
							className={classes("--header--delete")}
							onClick={() =>
								deleteCommentConfirmation.openPopup()
							}
						>
							<AiOutlineDelete />
						</button>
					) : null}
				</div>
				<div className={classes("--body")}>{comment.content}</div>
				<div className={classes("--footer")}>
					{showReply ? (
						<div className={classes("--footer--replies")}>
							{replies?.map((reply, index) => (
								<BlogCommentPaneComment
									blogId={blogId}
									key={index}
									comment={reply}
									enableReply={false}
									onDelete={() => {
										setReplies(
											replies?.filter(
												(r) => r._id !== reply._id
											)
										);
									}}
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
									<div
										className={classes(
											"--footer-form__bar"
										)}
									>
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
								<AiOutlineComment />{" "}
								{comment.replies?.length ?? 0}
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
			{deleteCommentConfirmation.showPopup
				? deleteCommentConfirmation.Modal
				: null}
		</>
	);
};

export default BlogCommentPaneComment;
