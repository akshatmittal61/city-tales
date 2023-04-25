import { Blog } from "@/components/Blogs";
import { sampleBlogs } from "@/constants/blogs";
import styles from "@/styles/Stories.module.scss";
import { stylesConfig } from "@/utils/functions";
import React from "react";

const classes = stylesConfig(styles);

const BlogsPage: React.FC<{ blogs: any[] }> = ({ blogs }) => {
	return (
		<main className={classes("blogs")}>
			<div className={classes("blogs-head")}>
				<h1 className={classes("blogs-head-title")}>
					Read the Stories
				</h1>
			</div>
			<div className={classes("blogs-body")}>
				{blogs.map((blog) => (
					<Blog key={blog.id} {...blog} />
				))}
			</div>
		</main>
	);
};

export default BlogsPage;

export const getServerSideProps = async () => {
	return {
		props: {
			blogs: Array(11)
				.fill(
					sampleBlogs.map((blog) => ({
						...blog,
						date: blog.date?.toString() ?? "2000-01-01",
					}))
				)
				.flat(),
		},
	};
};
