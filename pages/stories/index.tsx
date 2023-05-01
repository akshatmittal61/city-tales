import React, { useEffect, useState } from "react";
import { BlogCard as Blog } from "@/components/Blogs";
import { sampleBlogs } from "@/constants/blogs";
import Filters from "@/library/Filter/Filters";
import styles from "@/styles/Stories.module.scss";
import { convertToSlug, stylesConfig } from "@/utils/functions";

const classes = stylesConfig(styles, "blogs");

const BlogsPage: React.FC<{ blogs: any[] }> = ({ blogs }) => {
	const [filters, setFilters] = useState<any>([]);

	useEffect(() => {
		const tags = blogs.map((blog) => blog.tags);
		const uniqueTags = [...new Set(tags.flat())];
		setFilters(
			uniqueTags.map((tag) => ({
				id: convertToSlug(tag),
				name: tag,
				value: tag,
				selected: false,
			}))
		);
	}, [blogs]);

	return (
		<main className={classes("")}>
			<div className={classes("-head")}>
				<h1 className={classes("-head-title")}>Read the Stories</h1>
			</div>
			<Filters
				filters={filters}
				onChange={(filters: any) => {
					setFilters(filters);
				}}
				showSelected
			/>
			<div className={classes("-body")}>
				{blogs.map((blog, index) =>
					filters.some((filter: any) => filter.selected) ? (
						filters
							.filter((filter: any) => filter.selected)
							.some((filter: any) =>
								blog.tags
									.map((tag: string) => convertToSlug(tag))
									.includes(filter.id)
							) && <Blog key={blog.id + index} {...blog} />
					) : (
						<Blog key={blog.id + index} {...blog} />
					)
				)}
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
