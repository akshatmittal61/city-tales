import React, { useState } from "react";
import styles from "./PersonalInfo.module.scss";
import { stylesConfig } from "@/utils/functions";
import Input from "@/library/Input";

const classes = stylesConfig(styles, "my-account-personal-info");

interface MyAccountPersonalInfoProps {
	user: any;
}

const MyAccountPersonalInfo: React.FC<MyAccountPersonalInfoProps> = ({
	user,
}) => {
	const [userDetails, setUserDetails] = useState({
		name: user?.name ?? "",
		email: user?.email ?? "",
	});

	return (
		<article className={classes("")}>
			<h1 className={classes("-header")}>Personal Info</h1>
			<form className={classes("-form")}>
				<Input
					value={userDetails.name}
					onChange={(e) =>
						setUserDetails({ ...userDetails, name: e.target.value })
					}
					placeholder="Enter your name"
					error={userDetails.name === ""}
					errorMessage="Name is required"
					required
				/>
				<Input
					value={userDetails.email}
					disabled
					placeholder="Enter your email"
					error={userDetails.email === ""}
					errorMessage="Email is required"
					required
				/>
			</form>
		</article>
	);
};

export default MyAccountPersonalInfo;
