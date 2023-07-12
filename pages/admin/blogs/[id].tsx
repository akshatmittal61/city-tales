import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/Blogs.module.scss";
import { stylesConfig } from "@/utils/functions";
import Input from "@/library/Input";
import { toast } from "react-toastify";
import { fetchBlogById, patchBlog, postBlog } from "@/utils/api/blogs";
import { useRouter } from "next/router";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import Button from "@/library/Button";
import { BLOG } from "@/constants/enum";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { uploadImage } from "@/utils/api/utils";

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "admin-blog-new");

const AdminNewBlogPage: React.FC = () => {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [operating, setOperating] = useState(false);
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
		setOperating(false);
		return res?.data;
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
					const imgFile = await fetch(initialImageUrl).then((res) =>
						res.blob()
					);
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
		const newContent = await replaceAllBlobImages(content);
		setNewBlog((prev) => ({
			...prev,
			content: newContent,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setOperating(true);
		try {
			let res;
			if (router.query.id === "new") {
				res = await postBlog({
					...newBlog,
					tags: newBlog.tags
						.trim()
						.split(",")
						.map((tag: string) => tag.trim()),
				});
			} else {
				res = await patchBlog(router.query.id as string, {
					...newBlog,
					tags: newBlog.tags
						.trim()
						.split(",")
						.map((tag: string) => tag.trim()),
				});
			}
			if (newBlog.status === BLOG.STATUS.PUBLISHED)
				router.push({
					pathname: "/stories/[id]",
					query: { id: res.data._id },
				});
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setOperating(false);
		}
	};

	const fetchBlog = async () => {
		try {
			setIsLoading(true);
			const id = router.query.id as string;
			const res = await fetchBlogById(id);
			return {
				...res.data,
				tags: res.data.tags?.join(","),
			};
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
			return null;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (router.query.id === "new") {
			setNewBlog({
				title: "",
				content: "",
				type: [BLOG.TYPE.STORY],
				status: BLOG.STATUS.PUBLISHED,
				tags: "",
				coverImage: "",
				excerpt: "",
				location: "",
			});
			setIsLoading(false);
		} else
			fetchBlog().then((res: any) => {
				setNewBlog((prev) => ({
					...prev,
					...res,
				}));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.id]);

	return isLoading ? (
		<div className={classes("-loading")}>
			<AiOutlineLoading3Quarters className={classes("-loading-icon")} />
		</div>
	) : (
		<main className={classes("")}>
			<h1 className={classes("-head")}>
				{router.query.id === "new" ? "Add" : "Update"} Blog
			</h1>
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
					{router.query.id === "new" ? "Add Blog" : "Update Blog"}
				</Button>
			</form>
		</main>
	);
};

export default AdminNewBlogPage;
