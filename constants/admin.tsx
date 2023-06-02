import { ITableHeadField } from "@/library/Table";
import Image from "next/image";

import reviewStyles from "@/styles/admin/Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
const reviewClasses = stylesConfig(reviewStyles, "admin-reviews");

export const reviewsTableFields: ITableHeadField[] = [
	{
		id: "name",
		key: "user",
		label: "Name",
		sortable: true,
		align: "left",
		formatter(user) {
			return user.name;
		},
	},
	{
		id: "title",
		key: "title",
		label: "Title",
		align: "left",
		formatter: "text",
		style: {
			maxWidth: "200px",
		},
	},
	{
		id: "view",
		key: "view",
		label: "View",
		align: "center",
		formatter(_) {
			return "View";
		},
		style: {
			color: "var(--color-black)",
			cursor: "pointer",
		},
	},
	{
		id: "approve",
		key: "approved",
		label: "Approval",
		align: "center",
		formatter(approved) {
			return approved ? (
				<span className={reviewClasses("-approval")}>
					<Image
						src="/icons/tick.svg"
						width="20"
						height="20"
						alt="Approved"
					/>
					<span>Approved</span>
				</span>
			) : (
				<span className={reviewClasses("-approval")}>
					<Image
						src="/icons/cross.svg"
						width="20"
						height="20"
						alt="Not Approved"
					/>
					<span>Not Approved</span>
				</span>
			);
		},
	},
];
