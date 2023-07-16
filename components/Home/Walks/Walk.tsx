import React, { useState } from "react";
import Image from "next/image";
import Button from "@/library/Button";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./Walks.module.scss";
import { stylesConfig } from "@/utils/functions";
import { IWalk } from "@/types/Walk";
import { useRouter } from "next/router";
import useRender from "@/hooks/render";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useConfirmationModal } from "@/components/Confirmation";
import { deleteWalk as deleteWalkApi } from "@/utils/api/walks";
import { toast } from "react-toastify";

const classes = stylesConfig(styles, "home-walks-walk");

interface WalkProps extends IWalk {
	style?: React.CSSProperties;
	button?: {
		text: string;
		action: any;
	};
	showSlots?: boolean;
	isAdmin?: boolean;
	onDelete?: (_: string) => void;
}

const Walk: React.FC<WalkProps> = ({
	title,
	content,
	coverImage,
	slots,
	style,
	type,
	_id,
	isAdmin = false,
	onDelete = () => {},
}) => {
	const router = useRouter();
	const render = useRender();
	const [deleting, setDeleting] = useState(false);

	const deleteWalk = async () => {
		try {
			setDeleting(true);
			await deleteWalkApi(_id);
			toast.success("Walk deleted successfully");
			onDelete(_id);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setDeleting(false);
		}
	};

	const deleteWalkConfirmation = useConfirmationModal(
		"Delete Walk",
		`Are you sure you want to delete ${title}?`,
		deleteWalk,
		() => {}
	);

	return (
		<>
			<div className={classes("")} style={style}>
				<div className={classes("__content")}>
					<h1 className={classes("__content--title")}>{title}</h1>
					{render === "client" ? (
						<p
							className={classes("__content--description")}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					) : null}
					<div className={classes("__content--actions")}>
						{isAdmin ? (
							<>
								<Button
									variant="outlined"
									icon={<AiOutlineEdit />}
									iconPosition="left"
									onClick={() => {
										router.push(`/admin/walks/${_id}`);
									}}
									size="small"
								>
									Edit
								</Button>
								<Button
									variant="outlined"
									icon={<AiOutlineDelete />}
									iconPosition="left"
									onClick={() => {
										deleteWalkConfirmation.openPopup();
									}}
									size="small"
									loading={deleting}
								>
									Delete
								</Button>
							</>
						) : (
							<>
								<Button
									variant="outlined"
									icon={<IoIosArrowForward />}
									iconPosition="right"
									onClick={() => {
										router.push(`/walks/${_id}`);
									}}
									size="small"
								>
									View Details
								</Button>
								{type === "upcoming" ? (
									<span
										className={classes(
											"__content--actions__slots"
										)}
									>
										{slots} slots left
									</span>
								) : null}
							</>
						)}
					</div>
				</div>
				<div className={classes("__image")}>
					<Image
						src={coverImage}
						alt={title}
						width={1920}
						height={1080}
					/>
				</div>
			</div>
			{deleteWalkConfirmation.showPopup
				? deleteWalkConfirmation.Modal
				: null}
		</>
	);
};

export default Walk;
