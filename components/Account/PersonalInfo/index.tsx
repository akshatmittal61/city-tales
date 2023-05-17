import React, { useEffect, useState } from "react";
import styles from "./PersonalInfo.module.scss";
import { stylesConfig } from "@/utils/functions";
import Input from "@/library/Input";
import { IUser } from "@/types/auth";
import Button from "@/library/Button";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "@/global/helpers/user";
import regex from "@/constants/regex";
import Avatar from "@/components/Avatar/Avatar";

const classes = stylesConfig(styles, "my-account-personal-info");

interface MyAccountPersonalInfoProps {
	user: IUser;
}

const MyAccountPersonalInfo: React.FC<MyAccountPersonalInfoProps> = ({
	user,
}) => {
	const dispatch = useDispatch<any>();
	const [loading, setLoading] = useState(false);
	const [userDetails, setUserDetails] = useState<any>({
		name: user?.name ?? "",
		email: user?.email ?? "",
		phone: user?.phone ?? "",
		avatar: user?.avatar ?? "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetails((prev: any) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!regex.name.test(userDetails.name) ||
			(!regex.phone.test(userDetails.phone) && userDetails.phone !== "")
		) {
			alert("Please enter valid details");
			return;
		}
		setLoading(true);
		try {
			await dispatch(updateUserDetails(userDetails));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setUserDetails({
			name: user?.name ?? "",
			email: user?.email ?? "",
			phone: user?.phone ?? "",
			avatar: user?.avatar ?? "",
		});
	}, [user]);

	return (
		<article className={classes("")}>
			<h1 className={classes("-header")}>Personal Info</h1>
			<div className={classes("-container")}>
				<form className={classes("-form")} onSubmit={handleSubmit}>
					<Input
						name="name"
						value={userDetails.name}
						onChange={handleChange}
						placeholder="Enter your name"
						error={!regex.name.test(userDetails.name)}
						errorMessage="Name is required"
						required
						style={{
							width: "100%",
						}}
					/>
					<Input
						value={userDetails.email}
						disabled
						placeholder="Enter your email"
						error={userDetails.email === ""}
						errorMessage="Email is required"
						required
						style={{
							width: "100%",
						}}
					/>
					<Input
						name="phone"
						value={userDetails.phone}
						placeholder="Enter your phone number"
						style={{
							width: "100%",
						}}
						error={
							!regex.phone.test(userDetails.phone) &&
							userDetails.phone !== ""
						}
						errorMessage="A valid Phone number is required"
						onChange={handleChange}
					/>
					<Input
						name="avatar"
						value={userDetails.avatar}
						placeholder="Avatar URL"
						style={{
							width: "100%",
						}}
						onChange={handleChange}
					/>
					<Button type="submit" loading={loading}>
						Update Details
					</Button>
				</form>
				<div className={classes("-avatar")}>
					{user && regex.avatar.test(userDetails.avatar) ? (
						<Avatar
							src={userDetails.avatar}
							size="large"
							alt={userDetails.name}
						/>
					) : null}
				</div>
			</div>
		</article>
	);
};

export default MyAccountPersonalInfo;
