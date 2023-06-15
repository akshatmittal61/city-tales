import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { patchWalk, postAWalk } from "@/utils/api/admin";
import Input from "@/library/Input";
import Button from "@/library/Button";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { fetchWalkById } from "@/utils/api/walks";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { uploadImage } from "@/utils/api/utils";

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "admin-walk-new");

const AdminNewWalkPage: React.FC = () => {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [operating, setOperating] = useState(false);
	const [newWalk, setNewWalk] = useState({
		title: "",
		content: "",
		date: "",
		excerpt: "",
		location: "",
		map: "",
		coverImage: "",
		slots: "",
		price: "",
		type: "upcoming",
		razorpayLink: "",
	});

	const handleChange = (e: any) => {
		setNewWalk((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
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
		const res = await uploadImage(imageDataURL, "walks");
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
		setNewWalk((prev) => ({
			...prev,
			content: newContent,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!newWalk.title ||
			!newWalk.content ||
			!newWalk.map ||
			!newWalk.coverImage ||
			!newWalk.location
		)
			return toast.error("Please fill all the required fields");
		if (newWalk.type === "upcoming") {
			if (
				!newWalk.date ||
				!newWalk.location ||
				!newWalk.razorpayLink ||
				!newWalk.price
			)
				return toast.error("Please fill all the required fields");
		}
		setOperating(true);
		try {
			let res;
			if (newWalk.map) {
				const regex = /src="(.+?)"/;
				const mapSrc = newWalk.map.match(regex);
				if (mapSrc) {
					newWalk.map = mapSrc[1];
				}
			}
			if (newWalk.coverImage && newWalk.coverImage.includes("src=")) {
				const regex = /src="(.+?)"/;
				const coverImageSrc = newWalk.coverImage.match(regex);
				if (coverImageSrc) {
					newWalk.coverImage = coverImageSrc[1];
				}
			}
			if (router.query.id === "new") {
				res = await postAWalk(newWalk);
				window.open(`/walks/${res.data._id}`, "_blank");
				router.push("/admin/walks");
			} else {
				res = await patchWalk(router.query.id as string, newWalk);
				window.open(`/walks/${res.data._id}`, "_blank");
			}
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setOperating(false);
		}
	};

	const fetchWalk = async () => {
		try {
			setIsLoading(true);
			const id = router.query.id as string;
			const res = await fetchWalkById(id);
			return {
				...res.data,
				coverImage: `<img src="${res.data.coverImage}" />`,
				map: `<iframe src="${res.data.map}" />`,
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
			setNewWalk({
				title: "",
				content: "",
				date: "",
				excerpt: "",
				location: "",
				map: "",
				coverImage: "",
				slots: "",
				price: "",
				type: "upcoming",
				razorpayLink: "",
			});
			setIsLoading(false);
		} else
			fetchWalk().then((res: any) => {
				setNewWalk((prev) => ({
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
			<h1 className={classes("-head")}>Add a Walk</h1>
			<form className={classes("-form")} onSubmit={handleSubmit}>
				<Input
					type="hidden"
					name="type"
					value={newWalk.type}
					label="Walk Type"
				/>
				<select name="type" onChange={handleChange}>
					<option value="upcoming">Upcoming Walks</option>
					<option value="available">Available Tours</option>
				</select>
				<Input
					type="text"
					name="title"
					value={newWalk.title}
					onChange={handleChange}
					placeholder="Walk Title"
					required
					label="Title"
				/>
				<Input
					type="datetime-local"
					name="date"
					value={newWalk.date}
					onChange={handleChange}
					placeholder="Date"
					label="Date - Time"
					required={newWalk.type === "upcoming"}
				/>
				<SunEditor
					onChange={(content: string) => saveContent(content)}
					defaultValue={newWalk.content}
					setOptions={{
						width: "100%",
						height: "auto",
						minHeight: "100px",
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
							],
						],
					}}
				/>
				{newWalk.content ? (
					<div className={classes("-form__actions")}>
						<Button
							variant="outlined"
							size="small"
							onClick={(e) => {
								e.preventDefault();
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
						dangerouslySetInnerHTML={{ __html: newWalk.content }}
					/>
				) : null}
				<Input
					type="text"
					name="location"
					value={newWalk.location}
					onChange={handleChange}
					placeholder="Location"
					required
					label="Location"
				/>
				<Input
					type="text"
					name="map"
					value={newWalk.map}
					onChange={handleChange}
					placeholder="Embed map link"
					required
					label="Embed map link"
				/>
				<Input
					type="file"
					name="coverImage"
					onChange={async (e) => {
						const file = e.target.files?.[0];
						setOperating(true);
						const imgUrl = await handleImageUpload(file);
						setNewWalk((prev) => ({
							...prev,
							coverImage: imgUrl,
						}));
						setOperating(false);
					}}
					label="Cover Image"
				/>
				<Input
					type="number"
					name="slots"
					value={newWalk.slots}
					onChange={handleChange}
					placeholder="Slots"
					label="No. of Slots"
				/>
				<Input
					type="number"
					name="price"
					value={newWalk.price}
					onChange={handleChange}
					placeholder="Price"
					label="Price"
				/>
				<Input
					type="url"
					name="razorpayLink"
					value={newWalk.razorpayLink}
					onChange={handleChange}
					placeholder="Razorpay Link"
					required={newWalk.type === "upcoming"}
					label="Razorpay Link"
				/>
				<Button variant="filled" type="submit" loading={operating}>
					{router.query.id === "new"
						? "Publish the Walk"
						: "Update the Walk"}
				</Button>
			</form>
		</main>
	);
};

export default AdminNewWalkPage;
