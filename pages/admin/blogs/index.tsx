import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/Blogs.module.scss";
import { stylesConfig } from "@/utils/functions";
import Responsive from "@/layouts/Responsive";
import { toast } from "react-toastify";
import { fetchAllBlogs } from "@/utils/api/admin";
import Blog from "@/components/Blogs/BlogCard";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { USER_ROLES } from "@/constants/enum";
import useAuth from "@/hooks/auth";

const classes = stylesConfig(styles, "admin-blogs");

const AdminBlogsPage: React.FC = () => {
	const router = useRouter();
	const authState = useAuth();
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const getAllBlogs = async () => {
			try {
				const res = await fetchAllBlogs();
				setBlogs(res.data);
			} catch (error: any) {
				console.error(error);
				toast.error(error.message ?? "Something went wrong");
			}
		};
		if (authState.user?.role === USER_ROLES.ADMIN) getAllBlogs();
	}, [authState.user?.role]);

	return (
		<main className={classes("")}>
			<h1 className={classes("-head")}>Blogs</h1>
			<div className={classes("-container")}>
				<Responsive.Row>
					<Responsive.Col key={-1} xlg={33} lg={33} md={50} sm={100}>
						<div
							className={classes("-new")}
							onClick={() => router.push("/admin/blogs/new")}
						>
							<AiOutlineEdit />
							<span>Write a Blog</span>
						</div>
					</Responsive.Col>
					{blogs.map((blog: any, index: number) => (
						<Responsive.Col
							key={blog.id + index}
							xlg={33}
							lg={33}
							md={50}
							sm={100}
						>
							<Blog
								isAdmin
								{...blog}
								onDelete={(blogId: string) => {
									setBlogs((prev) =>
										prev.filter(
											(b: any) => b._id !== blogId
										)
									);
								}}
							/>
						</Responsive.Col>
					))}
				</Responsive.Row>
			</div>
		</main>
	);
};

export default AdminBlogsPage;
