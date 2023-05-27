import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { bookmarksSelector } from "@/global/slices/user";
import Responsive from "@/layouts/Responsive";
import { BlogCard as Blog } from "@/components/Blogs";
import { toast } from "react-toastify";
import { getBookmarkedBlogs } from "@/global/helpers/user";

const classes = stylesConfig(styles, "my-account-bookmarks");

const MyAccountBookmarks: React.FC = () => {
	const dispatch = useDispatch<any>();
	const bookmarks = useSelector(bookmarksSelector);

	useEffect(() => {
		const getBookarks = async () => {
			try {
				await dispatch(getBookmarkedBlogs());
			} catch (error: any) {
				console.error(error);
				toast.error(error.message);
			}
		};
		getBookarks();
	}, [dispatch]);

	return (
		<article className={classes("")}>
			<h1 className={classes("-header")}>My Bookmarks</h1>
			<div className={classes("-container")}>
				{bookmarks && bookmarks?.length > 0 ? (
					<Responsive.Row>
						{bookmarks?.map((bookmark, index) => (
							<Responsive.Col
								key={bookmark.id + index}
								xlg={50}
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
