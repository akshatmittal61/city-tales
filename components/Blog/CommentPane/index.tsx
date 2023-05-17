import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import React, { useRef, useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { BlogComment } from "@/types/Blog";
import moment from "moment";
import { useOnClickOutside } from "@/hooks/mouse-events";
import Button from "@/library/Button";

interface BlogCommentPaneProps {
	comments: BlogComment[];
	close: () => void;
}

const classes = stylesConfig(styles, "blog-comment-pane");

const BlogCommentPane: React.FC<BlogCommentPaneProps> = ({
	comments,
	close,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [myComment, setMyComment] = useState("");
	useOnClickOutside(ref, close);

	return (
		<div className={classes("")} ref={ref} data-aos="fade-left">
			<h1 className={classes("-header")}>
				Discussion ({comments.length})
			</h1>
			<div className={classes("-form")}>
				<textarea
					className={classes("-form__textarea")}
					placeholder="Share your thoughts..."
					onChange={(e) => setMyComment(e.target.value)}
					value={myComment}
				></textarea>
				<div className={classes("-form__foot")}>
					<span className={classes("-form__side")}>
						{myComment.split(" ").length > 300
							? "300/300 words"
							: `${myComment.split(" ").length}/300 words`}
					</span>
					<Button variant="outlined" size="small">
						Post
					</Button>
				</div>
			</div>
			<div className={classes("-comments")}>
				{comments.map((comment, index) => (
					<div className={classes("-comments__comment")} key={index}>
						<div className={classes("-comments__comment--header")}>
							<div
								className={classes(
									"-comments__comment--header--avatar"
								)}
							>
								<Avatar
									src={comment.user.avatar}
									alt={comment.user.name}
									size={40}
								/>
							</div>
							<div
								className={classes(
									"-comments__comment--header--details"
								)}
							>
								<span
									className={classes(
										"-comments__comment--header--details--name"
									)}
								>
									{comment.user.name}
								</span>
								<span
									className={classes(
										"-comments__comment--header--details--date"
									)}
								>
									{moment(comment.date).format("DD MMM YYYY")}
								</span>
							</div>
						</div>
						<div className={classes("-comments__comment--body")}>
							{comment.content}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BlogCommentPane;
