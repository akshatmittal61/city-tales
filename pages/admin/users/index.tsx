import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/Users.module.scss";
import { stylesConfig } from "@/utils/functions";
import { toast } from "react-toastify";
import { fetchAllUsers } from "@/utils/api/admin";
import Avatar from "@/components/Avatar/Avatar";
import { IUser } from "@/types/auth";
import {
	AiOutlineCalendar,
	AiOutlineMail,
	AiOutlinePhone,
} from "react-icons/ai";
import moment from "moment";
import Responsive from "@/layouts/Responsive";

const classes = stylesConfig(styles, "admin-users");

const AdminUsersPageUser: React.FC<Partial<IUser>> = (props) => {
	const classes = stylesConfig(styles, "admin-users-user");
	return (
		<div className={classes("")}>
			<div className={classes("-avatar")}>
				<Avatar src={props.avatar} alt={props.name} />
			</div>
			<div className={classes("-name")}>{props.name}</div>
			<div className={classes("-email")}>
				<AiOutlineMail />
				<a
					href={`mailto:${props.email}`}
					className={classes("-email-text")}
				>
					{props.email}
				</a>
			</div>
			{props.phone ? (
				<div className={classes("-phone")}>
					<AiOutlinePhone />
					<a
						href={`tel:${props.phone}`}
						className={classes("-phone-text")}
					>
						{props.phone}
					</a>
				</div>
			) : null}
			<div className={classes("-date")}>
				<AiOutlineCalendar />
				<span className={classes("-date-text")}>
					Registred At: {moment(props.createdAt).format("DD/MM/YYYY")}
				</span>
			</div>
		</div>
	);
};

const AdminUsersPage: React.FC = () => {
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const res = await fetchAllUsers();
				setAllUsers(res.data);
			} catch (error: any) {
				console.error();
				toast.error(error.message ?? "Something went wrong");
			}
		};
		getAllUsers();
	}, []);

	return (
		<main className={classes("")}>
			<h1 className={classes("-head")}>Users</h1>
			<div className={classes("-container")}>
				<Responsive.Row>
					{allUsers.map((user: any, index: number) => (
						<Responsive.Col
							key={index}
							xlg={25}
							lg={33}
							md={50}
							sm={100}
						>
							<AdminUsersPageUser {...user} />
						</Responsive.Col>
					))}
				</Responsive.Row>
			</div>
		</main>
	);
};

export default AdminUsersPage;
