import React, { useState } from "react";
import { Blog as IBlog } from "@/types/Blog";
import Button from "@/library/Button";
import styles from "./BlogCard.module.scss";
import { convertToSlug, stylesConfig } from "@/utils/functions";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { bookmark, nipLight } from "@/assets/vectors";
import { useRouter } from "next/router";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteBlog as deleteBlogApi } from "@/utils/api/blogs";
import { toast } from "react-toastify";
import { useConfirmationModal } from "../Confirmation";

const classes = stylesConfig(styles, "blogs-blog");

interface BlogProps extends IBlog {
	isAdmin?: boolean;
	onDelete?: (_: string) => void;
}

const Blog: React.FC<BlogProps> = ({
	id,
	_id,
	title,
	content,
	coverImage,
	excerpt,
	isAdmin = false,
	onDelete = () => {},
}) => {
	const router = useRouter();
	const [deleting, setDeleting] = useState(false);

	const deleteBlog = async () => {
		try {
			setDeleting(true);
			await deleteBlogApi(id ?? _id);
			toast.success("Blog deleted successfully");
			onDelete(id ?? _id);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setDeleting(false);
		}
	};

	const deleteBlogConfirmation = useConfirmationModal(
		"Delete Blog",
		`Are you sure you want to delete ${title}?`,
		deleteBlog,
		() => {}
	);

	return (
		<>
			<div className={classes("")}>
				<div
					className={classes("__image")}
					style={{
						backgroundImage: `url(${
							coverImage ? coverImage : "/images/rumi-darwaza.png"
						})`,
					}}
				></div>
				<div className={classes("__content")}>
					<h3
						className={classes("__content--title")}
						onClick={() => {
							if (isAdmin)
								router.push(`/admin/blogs/${id ?? _id}`);
							else
								router.push(
									"/stories/[...slug]",
									`/stories/${id ?? _id}/${convertToSlug(
										title
									)}`
								);
						}}
					>
						{title}
					</h3>
					<p className={classes("__content--excerpt")}>
						{excerpt
							? excerpt.length > 150
								? excerpt.slice(0, 150) + "..."
								: excerpt
							: content.slice(0, 150)}
					</p>
					<div className={classes("__buttons")}>
						{isAdmin ? (
							<>
								<Button
									className={classes("__buttons--button")}
									variant="outlined"
									icon={<AiOutlineEdit />}
									iconPosition="left"
									onClick={() => {
										router.push(
											`/admin/blogs/${id ?? _id}`
										);
									}}
								>
									Edit
								</Button>
								<Button
									className={classes("__buttons--button")}
									variant="outlined"
									icon={<AiOutlineDelete />}
									iconPosition="left"
									loading={deleting}
									onClick={() => {
										deleteBlogConfirmation.openPopup();
									}}
								>
									Delete
								</Button>
							</>
						) : (
							<Button
								className={classes("__buttons--button")}
								variant="outlined"
								icon={<IoIosArrowForward />}
								iconPosition="right"
								onClick={() => {
									router.push(
										"/stories/[...slug]",
										`/stories/${id ?? _id}/${convertToSlug(
											title
										)}`
									);
								}}
							>
								Read More
							</Button>
						)}
					</div>
				</div>
				<Image
					src={bookmark}
					alt="bookmark"
					width={64}
					height={84}
					className={classes("__bookmark")}
				/>
				<Image
					src={nipLight}
					alt="nip"
					width={52}
					height={52}
					className={classes("__nip")}
				/>
			</div>
			{deleteBlogConfirmation.showPopup
				? deleteBlogConfirmation.Modal
				: null}
		</>
	);
};

export default Blog;
