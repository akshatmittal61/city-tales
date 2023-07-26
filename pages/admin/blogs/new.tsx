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
import { BLOG } from "@/constants/enum";
import { uploadImage } from "@/utils/api/utils";
import { createUpdatelog as validateCreateBlog } from "@/validations/blogs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "admin-blog-new");

const AdminNewBlogPage: React.FC = () => {
	const router = useRouter();
	const [operating, setOperating] = useState(false);
	const [uploadingToS3, setUploadingToS3] = useState(false);
	const [newBlog, setNewBlog] = useState({
		title: "",
		content: "",
		type: [BLOG.TYPE.STORY],
		status: BLOG.STATUS.PUBLISHED,
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

	const handleTypeChange = (e: any) => {
		if (e.target.checked) {
			setNewBlog((prev) => ({
				...prev,
				type: [...prev.type, e.target.value],
			}));
		} else {
			setNewBlog((prev) => ({
				...prev,
				type: prev.type.filter((type) => type !== e.target.value),
			}));
		}
	};

	const handleImageUpload = async (file: any) => {
		try {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			setOperating(true);
			const imageDataURL = await new Promise((resolve, reject) => {
				reader.onloadend = () => {
					resolve(reader.result);
				};
				reader.onerror = reject;
			});
			const res = await uploadImage(imageDataURL, "blogs");
			return Promise.resolve(res?.data);
		} catch (error: any) {
			console.error(error);
			toast.error(error?.message ?? "Something went wrong");
			return Promise.reject(error);
		} finally {
			setOperating(false);
		}
	};

	const replaceAllBlobImages = async (content: string) => {
		const regex = /<img src="(.+?)"/g;
		const images = content.match(regex);
		if (images) {
			let newContent = content;
			for (const image of images) {
				const initialImageUrl = image.match(/<img src="(.+?)"/)?.[1];
				let imgUrlAfterUpload = initialImageUrl;
				if (
					(initialImageUrl && initialImageUrl.startsWith("blob")) ||
					(initialImageUrl && initialImageUrl.startsWith("data:"))
				) {
					const imgFile = await fetch(initialImageUrl)
						.then((res) => res.blob())
						.catch(() => null);
					imgUrlAfterUpload = await handleImageUpload(imgFile);
				}
				newContent = newContent.replace(
					image,
					`<img src="${imgUrlAfterUpload}"`
				);
			}
			return newContent;
		}
		return content;
	};

	const saveContent = async (content: string) => {
		try {
			setUploadingToS3(true);
			const newContent = await replaceAllBlobImages(content);
			setNewBlog((prev) => ({
				...prev,
				content: newContent,
			}));
		} catch (error: any) {
			console.error(error);
			toast.error(error?.message ?? "Something went wrong");
		} finally {
			setUploadingToS3(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setOperating(true);
		try {
			await validateCreateBlog(newBlog);
			let res = await postBlog({
				...newBlog,
				tags: newBlog.tags
					.trim()
					.split(",")
					.map((tag: string) => tag.trim()),
			});
			if (newBlog.status === BLOG.STATUS.PUBLISHED)
				router.push({
					pathname: "/stories/[id]",
					query: { id: res.data._id },
				});
			else router.push("/admin/blogs");
		} catch (error: any) {
			console.error(error);
			toast.error(error?.message ?? "Something went wrong");
		} finally {
			setOperating(false);
		}
	};

	return (
		<main className={classes("")}>
			<h1 className={classes("-head")}>Add Blog</h1>
			<form className={classes("-form")} onSubmit={handleSubmit}>
				<Input
					type="text"
					name="title"
					value={newBlog.title}
					onChange={handleChange}
					placeholder="Title"
					autoFocus
					style={{ width: "100%" }}
				/>
				<Input
					type="text"
					name="excerpt"
					value={newBlog.excerpt}
					onChange={handleChange}
					placeholder="Excerpt"
					style={{ width: "100%" }}
				/>
				{uploadingToS3 ? (
					<div className={classes("-loading")}>
						<AiOutlineLoading3Quarters
							className={classes("-loading-icon")}
						/>
						<p className={classes("-loading-text")}>
							Uploading Images...
						</p>
					</div>
				) : (
					<SunEditor
						placeholder="Content"
						defaultValue={newBlog.content}
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
				)}
				<Input
					type="file"
					label="Cover Image"
					name="coverImage"
					onChange={async (e: any) => {
						const file = e.target.files[0];
						setOperating(true);
						const imgUrl = await handleImageUpload(file);
						setOperating(false);
						setNewBlog((prev) => ({
							...prev,
							coverImage: imgUrl,
						}));
					}}
					style={{ width: "100%" }}
				/>
				<Input
					type="text"
					name="tags"
					value={newBlog.tags}
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
				<div className={classes("-type")}>
					<label htmlFor="type">Type</label>
					<div className={classes("-type__checkboxes")}>
						<label htmlFor="type-exploration">
							<input
								type="checkbox"
								name="type"
								value={BLOG.TYPE.EXPLORATION}
								checked={newBlog.type.includes(
									BLOG.TYPE.EXPLORATION
								)}
								id="type-exploration"
								onChange={(e: any) => {
									handleTypeChange(e);
								}}
							/>
							Exploration
						</label>
						<label htmlFor="type-showcase">
							<input
								type="checkbox"
								name="type"
								value={BLOG.TYPE.SHOWCASE}
								checked={newBlog.type.includes(
									BLOG.TYPE.SHOWCASE
								)}
								id="type-showcase"
								onChange={(e: any) => {
									handleTypeChange(e);
								}}
							/>
							Showcase
						</label>
					</div>
				</div>
				<div className={classes("-type")}>
					<label htmlFor="type">Status</label>
					<div className={classes("-type__checkboxes")}>
						<label htmlFor="status-draft">
							<input
								type="radio"
								name="type"
								checked={newBlog.status === BLOG.STATUS.DRAFT}
								id="status-draft"
								onChange={() => {
									setNewBlog((prev) => ({
										...prev,
										status: BLOG.STATUS.DRAFT,
									}));
								}}
							/>
							Save as Draft
						</label>
						<label htmlFor="status-published">
							<input
								type="radio"
								name="type"
								checked={
									newBlog.status === BLOG.STATUS.PUBLISHED
								}
								id="status-published"
								onChange={() => {
									setNewBlog((prev) => ({
										...prev,
										status: BLOG.STATUS.PUBLISHED,
									}));
								}}
							/>
							Publish
						</label>
					</div>
				</div>
				<Button
					variant="filled"
					type="submit"
					style={{
						width: "fit-content",
					}}
					loading={operating}
				>
					Add Blog
				</Button>
			</form>
		</main>
	);
};

export default AdminNewBlogPage;
