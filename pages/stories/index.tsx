import React, { useEffect, useState } from "react";
import { BlogCard as Blog } from "@/components/Blogs";
import Filters from "@/library/Filter/Filters";
import styles from "@/styles/Stories.module.scss";
import { convertToSlug, stylesConfig } from "@/utils/functions";
import Responsive from "@/layouts/Responsive";
import { fetchAllBlogs } from "@/utils/api/blogs";

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
				<Responsive.Row>
					{blogs.map((blog, index) =>
						filters.some((filter: any) => filter.selected) ? (
							filters
								.filter((filter: any) => filter.selected)
								.some((filter: any) =>
									blog.tags
										.map((tag: string) =>
											convertToSlug(tag)
										)
										.includes(filter.id)
								) && (
								<Responsive.Col
									key={blog.id + index}
									xlg={33}
									lg={33}
									md={50}
									sm={100}
								>
									<Blog {...blog} />
								</Responsive.Col>
							)
						) : (
							<Responsive.Col
								key={blog.id + index}
								xlg={33}
								lg={33}
								md={50}
								sm={100}
							>
								<Blog {...blog} />
							</Responsive.Col>
						)
					)}
				</Responsive.Row>
			</div>
		</main>
	);
};

export default BlogsPage;

export const getServerSideProps = async () => {
	try {
		const res = await fetchAllBlogs();
		return {
			props: {
				blogs: JSON.parse(JSON.stringify(res.data)),
			},
		};
	} catch (error: any) {
		console.error(error);
		return {
			props: {
				blogs: [],
			},
		};
	}
};
