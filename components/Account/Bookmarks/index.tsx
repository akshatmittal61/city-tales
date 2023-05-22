import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "@/utils/functions";
import { useSelector } from "react-redux";
import { userSelector } from "@/global/slices/user";
import Responsive from "@/layouts/Responsive";
import { BlogCard as Blog } from "@/components/Blogs";

const classes = stylesConfig(styles, "my-account-bookmarks");

const MyAccountBookmarks: React.FC = () => {
	const user = useSelector(userSelector);
	return (
		<article className={classes("")}>
			<h1 className={classes("-header")}>My Bookmarks</h1>
			<div className={classes("-container")}>
				{user?.bookmarks && user?.bookmarks?.length > 0 ? (
					<Responsive.Row>
						{user?.bookmarks?.map((bookmark, index) => (
							<Responsive.Col
								key={bookmark.id + index}
								xlg={33}
								lg={50}
								md={50}
								sm={100}
							>
								<Blog {...bookmark} />
							</Responsive.Col>
						))}
					</Responsive.Row>
				) : (
					<p className={classes("-container__empty")}>
						You have no bookmarks.
					</p>
				)}
			</div>
		</article>
	);
};

export default MyAccountBookmarks;
