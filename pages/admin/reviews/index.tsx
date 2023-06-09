import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/Reviews.module.scss";
import { stylesConfig } from "@/utils/functions";
import { toast } from "react-toastify";
import {
	approveMultipleReviews,
	approveReview,
	fetchAllReviews,
	rejectMultipleReviews,
	rejectReview,
} from "@/utils/api/admin";
import Table from "@/library/Table";
import { reviewsTableFields } from "@/constants/admin";
import ReviewPopup from "@/components/Review/ReviewPopup";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const classes = stylesConfig(styles, "admin-reviews");

const AdminReviewsPage: React.FC = () => {
	const [allReviews, setAllReviews] = useState<any[]>([]);
	const [popupReview, setPopupReview] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const getAllReviews = async () => {
		setLoading(true);
		try {
			const res = await fetchAllReviews();
			console.log(res.data);

			setAllReviews(res.data);
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const updateTableData = async (data: any) => {
		setAllReviews(() => data);
		return Promise.resolve();
	};

	const toggleApproval = async (status: "approve" | "reject") => {
		const selectedReviewsIds = allReviews
			.filter((review: any) => review.selected)
			.map((review: any) => review._id);
		try {
			if (selectedReviewsIds.length === 0) return;
			else if (selectedReviewsIds.length === 1) {
				if (status === "approve") {
					await approveReview(selectedReviewsIds[0]);
					toast.success("Review approved");
				} else {
					await rejectReview(selectedReviewsIds[0]);
					toast.success("Review rejected");
				}
			} else {
				if (status === "approve") {
					await approveMultipleReviews(selectedReviewsIds);
					toast.success("Reviews approved");
				} else {
					await rejectMultipleReviews(selectedReviewsIds);
					toast.success("Reviews rejected");
				}
			}
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setAllReviews((prev) =>
				prev.map((review: any) => ({ ...review, selected: false }))
			);
			getAllReviews();
		}
	};

	useEffect(() => {
		getAllReviews();
	}, []);

	return (
		<main className={classes("")}>
			<h1 className={classes("-head")}>Reviews</h1>
			{allReviews.some((review: any) => review.selected) ? (
				<div className={classes("-head__actions")}>
					<button
						className={classes(
							"-head__actions--btn",
							"-head__actions--btn--tick"
						)}
						onClick={() => toggleApproval("approve")}
					>
						<Image
							src="/icons/tick.svg"
							alt="tick"
							width={16}
							height={16}
						/>
						<span>Approve Selected Reviews</span>
					</button>
					<button
						className={classes(
							"-head__actions--btn",
							"-head__actions--btn--cross"
						)}
						onClick={() => toggleApproval("reject")}
					>
						<Image
							src="/icons/cross.svg"
							alt="cross"
							width={16}
							height={16}
						/>
						<span>Reject Selected Reviews</span>
					</button>
				</div>
			) : null}
			<div className={classes("-container")}>
				{loading ? (
					<div className={classes("-loading")}>
						<AiOutlineLoading3Quarters
							className={classes("-loading-icon")}
						/>
					</div>
				) : (
					<Table
						selectable
						fields={reviewsTableFields}
						data={allReviews}
						updateData={updateTableData}
						rowEvents={{
							onClick(review) {
								console.log(review);
								setPopupReview(review);
							},
						}}
					/>
				)}
			</div>
			{popupReview ? (
				<ReviewPopup
					review={popupReview}
					onClose={() => setPopupReview(null)}
				/>
			) : null}
		</main>
	);
};

export default AdminReviewsPage;
