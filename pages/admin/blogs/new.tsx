import React, { useState } from "react";
import styles from "@/styles/admin/Blogs.module.scss";
import { stylesConfig } from "@/utils/functions";
import Input from "@/library/Input";
import { toast } from "react-toastify";
import { postBlog } from "@/utils/api/blogs";
import { useRouter } from "next/router";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import Button from "@/library/Button";

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "admin-blog-new");

const AdminNewBlogPage: React.FC = () => {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
	const [newBlog, setNewBlog] = useState({
		title: "",
		content: "",
		type: "story",
		status: "published",
		tags: "",
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

	const saveContent = (content: string) => {
		setNewBlog((prev) => ({
			...prev,
			content,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await postBlog({
				...newBlog,
				tags: newBlog.tags
					.trim()
					.split(",")
					.map((tag: string) => tag.trim()),
			});
			router.push({
				pathname: "/stories/[id]",
				query: { id: res.data._id },
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
					style={{ width: "100%" }}
				/>
				<Input
					type="text"
					name="excerpt"
					onChange={handleChange}
					placeholder="Excerpt"
					style={{ width: "100%" }}
				/>
				<SunEditor
					placeholder="Content"
					onChange={saveContent}
					setOptions={{
						width: "100%",
						height: "auto",
						minHeight: "400px",
						maxHeight: "100%",
						buttonList: [
							["font", "fontSize", "formatBlock"],
							[
								"bold",
								"underline",
								"italic",
								"strike",
								"subscript",
								"superscript",
								"link",
							],
							["image", "fontColor", "align", "list"],
							[
								"undo",
								"redo",
								"removeFormat",
								"preview",
								"print",
								"save",
							],
						],
					}}
				/>
				{newBlog.content ? (
					<div className={classes("-form__actions")}>
						<Button
							variant="outlined"
							size="small"
							onClick={(e: any) => {
								e?.preventDefault();
								setShowPreview((prev) => !prev);
							}}
							style={{
								width: "fit-content",
							}}
						>
							{showPreview ? "Hide Preview" : "Show Preview"}
						</Button>
					</div>
				) : null}
				{showPreview ? (
					<div
						className={classes("-form__preview")}
						style={{ display: showPreview ? "block" : "none" }}
						dangerouslySetInnerHTML={{ __html: newBlog.content }}
					/>
				) : null}
				<SunEditor
					placeholder="Cover Image"
					onChange={(image: string) =>
						setNewBlog((prev) => ({
							...prev,
							coverImage: image?.match(/src="(.+?)"/)?.[1] ?? "",
						}))
					}
					setOptions={{
						width: "100%",
						height: "auto",
						minHeight: "100px",
						maxHeight: "100%",
						buttonList: [["image", "preview"]],
					}}
				/>
				<Input
					type="text"
					name="tags"
					placeholder="Tags"
					onChange={handleChange}
					style={{ width: "100%" }}
				/>
				<div className={classes("-tags")}>
					{newBlog.tags
						.trim()
						.split(",")
						.map((tag: string) => tag.trim())
						.filter((tag: string) => tag !== "")
						.map((tag: string, index: number) => (
							<span className={classes("-tags-tag")} key={index}>
								{tag}
							</span>
						))}
				</div>
				<Button
					variant="filled"
					type="submit"
					style={{
						width: "fit-content",
					}}
				>
					Add Blog
				</Button>
			</form>
		</main>
	);
};

export default AdminNewBlogPage;
