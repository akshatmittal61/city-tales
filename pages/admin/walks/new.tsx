import React, { useState } from "react";
import styles from "@/styles/admin/Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { postAWalk } from "@/utils/api/admin";
import Input from "@/library/Input";
import Button from "@/library/Button";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "admin-walk-new");

const AdminNewWalkPage: React.FC = () => {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
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
			if (newWalk.map) {
				const regex = /src="(.+?)"/;
				const mapSrc = newWalk.map.match(regex);
				if (mapSrc) {
					newWalk.map = mapSrc[1];
				}
			}
			const res = await postAWalk(newWalk);
			window.open(`/walks/${res.data.id}`, "_blank");
			router.push("/admin/walks");
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	return (
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
								"save",
							],
						],
						callBackSave: saveContent,
					}}
				/>
				{newWalk.content ? (
					<div className={classes("-form__actions")}>
						<Button
							variant="outlined"
							size="small"
							onClick={() => setShowPreview((prev) => !prev)}
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
				<Input
					type="file"
					name="coverImage"
					value={newWalk.coverImage}
					onChange={handleChange}
					placeholder="Cover Image"
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
