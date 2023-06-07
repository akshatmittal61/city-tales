import React, { useState } from "react";
import styles from "@/styles/Enquiry.module.scss";
import { stylesConfig } from "@/utils/functions";
import { fetchWalkById } from "@/utils/api/walks";
import Input from "@/library/Input";
import Button from "@/library/Button";
import { IWalk } from "@/types/Walk";
import { MapPin } from "react-feather";

const classes = stylesConfig(styles, "enquiry");

const BookATourPage: React.FC<{ walk: IWalk; reviews: any[] }> = ({ walk }) => {
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		phone: "",
		visitors: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(userDetails);
	};

	return (
		<main className={classes("")}>
			<article className={classes("-details")}>
				<div className={classes("-details-header")}>
					<h1 className={classes("-details-header__title")}>
						Details
					</h1>
					<span className={classes("-details-header__subtitle")}>
						Fill the details and send an enquiry via email
					</span>
				</div>
				<form
					onSubmit={handleSubmit}
					className={classes("-details-form")}
				>
					<Input
						placeholder="Name"
						value={userDetails.name}
						onChange={handleChange}
						name="name"
						style={{ width: "100%" }}
					/>
					<Input
						placeholder="Email"
						value={userDetails.email}
						onChange={handleChange}
						name="email"
						style={{ width: "100%" }}
					/>
					<Input
						placeholder="Phone No. (with area code)"
						value={userDetails.phone}
						onChange={handleChange}
						name="phone"
						style={{ width: "100%" }}
					/>
					<Input
						placeholder="No. of Visitors"
						value={userDetails.visitors}
						onChange={handleChange}
						name="visitors"
						type="number"
						min={1}
						style={{ width: "100%" }}
					/>
					<div className={classes("-details-form-group")}>
						<Button
							variant="outlined"
							onClick={() => {
								window.open(
									`https://wa.me/+919456849466?text=Hi, I am ${userDetails.name} and I am interested in ${walk.title} for a tour with ${userDetails.visitors} people. Please contact me on ${userDetails.email} or ${userDetails.phone} for further details.`
								);
							}}
							style={{ width: "50%" }}
						>
							Contact on WhatsApp
						</Button>
						<Button
							variant="outlined"
							onClick={() => {
								window.open(
									`mailto:akshatmittal2506@gmail.com?subject=Enquiry for ${walk.title}&body=Hi, I am ${userDetails.name} and I am interested in ${walk.title} for a tour with ${userDetails.visitors} people. Please contact me on ${userDetails.email} or ${userDetails.phone} for further details.`
								);
							}}
							style={{ width: "50%" }}
						>
							Send Email
						</Button>
					</div>
				</form>
			</article>
			<aside
				className={classes("-right")}
				style={{
					backgroundImage: `url(${walk.coverImage})`,
				}}
			>
				<div className={classes("-right-header")}>
					<h1 className={classes("-right-header__title")}>
						{walk.title}
					</h1>
				</div>
				<div className={classes("-right-location")}>
					<MapPin />
					<span>{walk.location}</span>
				</div>
				<div className={classes("-right-excerpt")}>{walk.excerpt}</div>
			</aside>
		</main>
	);
};

export default BookATourPage;

export const getServerSideProps = async (context: any) => {
	const { id } = context.query;
	try {
		const res = await fetchWalkById(id);
		return {
			props: {
				walk: JSON.parse(JSON.stringify(res.data)),
				found: true,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				walk: null,
				found: false,
			},
		};
	}
};
