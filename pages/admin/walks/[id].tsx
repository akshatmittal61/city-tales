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

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "admin-walk-new");

const AdminNewWalkPage: React.FC = () => {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
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

	const saveContent = (content: string) => {
		setNewWalk((prev) => ({
			...prev,
			content,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
				console.log(res);
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
					type="text"
					name="title"
					value={newWalk.title}
					onChange={handleChange}
					placeholder="Title"
				/>
				<Input
					type="datetime-local"
					name="date"
					value={newWalk.date}
					onChange={handleChange}
					placeholder="Date"
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
				/>
				<Input
					type="text"
					name="map"
					value={newWalk.map}
					onChange={handleChange}
					placeholder="Embed map link"
				/>
				<SunEditor
					placeholder="Cover Image"
					defaultValue={newWalk.coverImage}
					onChange={(image: string) =>
						setNewWalk((prev) => ({
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
					type="number"
					name="slots"
					value={newWalk.slots}
					onChange={handleChange}
					placeholder="Slots"
				/>
				<Input
					type="number"
					name="price"
					value={newWalk.price}
					onChange={handleChange}
					placeholder="Price"
				/>
				<Input
					type="url"
					name="razorpayLink"
					value={newWalk.razorpayLink}
					onChange={handleChange}
					placeholder="Razorpay Link"
				/>
				<select name="type" onChange={handleChange}>
					<option value="upcoming">Upcoming Walks</option>
					<option value="available">Available Tours</option>
				</select>
				<Button variant="filled" type="submit">
					Publish the Walk
				</Button>
			</form>
		</main>
	);
};

export default AdminNewWalkPage;
