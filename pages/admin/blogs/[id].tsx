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

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "admin-blog-new");

const AdminNewBlogPage: React.FC = () => {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
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

	const saveContent = (content: string) => {
		setNewBlog((prev) => ({
			...prev,
			content,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
			router.push({
				pathname: "/stories/[id]",
				query: { id: res.data._id },
			});
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	const fetchBlog = async () => {
		try {
			setIsLoading(true);
			const id = router.query.id as string;
			console.log(router);
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
		} else
			fetchBlog().then((res: any) => {
				console.log(res);
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
				<SunEditor
					placeholder="Cover Image"
					defaultValue={`<img src="${newBlog.coverImage}" alt="Cover Image" />`}
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
				<Button
					variant="filled"
					type="submit"
					style={{
						width: "fit-content",
					}}
				>
					{router.query.id === "new" ? "Add Blog" : "Update Blog"}
				</Button>
			</form>
		</main>
	);
};

export default AdminNewBlogPage;
