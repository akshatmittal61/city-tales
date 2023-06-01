import React, { useState } from "react";
import styles from "@/styles/admin/Blogs.module.scss";
import { stylesConfig } from "@/utils/functions";
import Input from "@/library/Input";
import { toast } from "react-toastify";
import { postBlog } from "@/utils/api/blogs";
import { useRouter } from "next/router";

const classes = stylesConfig(styles, "admin-blog-new");

const AdminNewBlogPage: React.FC = () => {
	const router = useRouter();
	const [newBlog, setNewBlog] = useState({
		title: "",
		content: "",
		type: "story",
		status: "draft",
		tags: [],
		coverImage: "",
		excerpt: "",
		location: "",
	});

	const handleChange = (e: any) => {
		setNewBlog({
			...newBlog,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await postBlog(newBlog);
			router.push({
				pathname: "/stories/[id]",
				query: { id: res.data.id },
			});
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	return (
		<main className={classes("")}>
			<h1 className={classes("-head")}>Add a Blog</h1>
			<form className={classes("-form")} onSubmit={handleSubmit}>
				<Input
					type="text"
					name="title"
					onChange={handleChange}
					placeholder="Title"
					autoFocus
				/>
				<textarea
					name="content"
					onChange={handleChange}
					placeholder="Your blog Content"
					className={classes("-form__content")}
				/>
				<div className={classes("-tags")}>
					<Input type="text" name="tags" placeholder="Tags" />
				</div>
			</form>
		</main>
	);
};

export default AdminNewBlogPage;
