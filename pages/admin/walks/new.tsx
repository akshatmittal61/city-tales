import React, { useState } from "react";
import styles from "@/styles/admin/Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { postAWalk } from "@/utils/api/admin";
import Input from "@/library/Input";
import Button from "@/library/Button";

const classes = stylesConfig(styles, "admin-walk-new");

const AdminNewWalkPage: React.FC = () => {
	const router = useRouter();
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await postAWalk(newWalk);
			router.push({
				pathname: "/walks/[id]",
				query: { id: res.data.id },
			});
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
				<textarea
					name="excerpt"
					value={newWalk.excerpt}
					onChange={handleChange}
					placeholder="Excerpt"
					className={classes("-form__content")}
				/>
				<Input
					type="text"
					name="location"
					value={newWalk.location}
					onChange={handleChange}
					placeholder="Location"
				/>
				<Input
					type="url"
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
