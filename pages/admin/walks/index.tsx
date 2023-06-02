import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import { toast } from "react-toastify";
import { fetchAllWalks } from "@/utils/api/admin";
import Responsive from "@/layouts/Responsive";
import { useRouter } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";
import Walk from "@/components/Home/Walks/Walk";

const classes = stylesConfig(styles, "admin-walks");

const AdminWalksPage: React.FC = () => {
	const router = useRouter();
	const [allWalks, setAllWalks] = useState([]);

	useEffect(() => {
		const getAllWalks = async () => {
			try {
				const res = await fetchAllWalks();
				setAllWalks(res.data);
			} catch (error: any) {
				console.error(error);
				toast.error(error.message ?? "Something went wrong");
			}
		};
		getAllWalks();
	}, []);

	return (
		<main className={classes("")}>
			<h1 className={classes("-head")}>Walks</h1>
			<div className={classes("-container")}>
				<Responsive.Row>
					<Responsive.Col key={-1} xlg={50} lg={50} md={100} sm={100}>
						<div
							className={classes("-new")}
							onClick={() => router.push("/admin/walks/new")}
						>
							<AiOutlineEdit />
							<span>Create a Walk</span>
						</div>
					</Responsive.Col>
					{allWalks.map((walk: any, index: number) => (
						<Responsive.Col
							key={walk.id + index}
							xlg={50}
							lg={50}
							md={100}
							sm={100}
						>
							<Walk
								style={{
									width: "calc(100% - 20px)",
									margin: "10px 0",
								}}
								{...walk}
							/>
						</Responsive.Col>
					))}
				</Responsive.Row>
			</div>
		</main>
	);
};

export default AdminWalksPage;
