import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { reviewSelector, userSelector } from "@/global/slices/user";
import { IReview } from "@/types/Review";
import Button from "@/library/Button";
import { AiOutlineEdit, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { addReview, getUserReview } from "@/global/helpers/user";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import Avatar from "@/components/Avatar/Avatar";
import Input from "@/library/Input";
import { toast } from "react-toastify";
import { uploadImage } from "@/utils/api/utils";

const classes = stylesConfig(styles, "my-account-review");

interface MyAccountReviewProps {}

const MyAccountReview: React.FC<MyAccountReviewProps> = () => {
	const user = useSelector(userSelector);
	const dispatch = useDispatch<any>();
	const globalReview = useSelector(reviewSelector);
	const [image, setImage] = useState<any>(null);
	const [userReview, setUserReview] = useState<IReview>({
		user: user ?? {
			_id: "",
			name: "",
			email: "",
			role: "user",
		},
		title: globalReview?.title ?? "",
		content: globalReview?.content ?? "",
		rating: globalReview?.rating ?? 0,
		date: globalReview?.date ?? Date.now().toString(),
		isSubmitted: globalReview?.isSubmitted ?? false,
	});
	const [allowEdit, setAllowEdit] = useState(
		userReview.isSubmitted ? false : true
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!userReview.content) throw new Error("Please enter a review");
			if (!userReview.rating)
				throw new Error("Please enter a valid rating (1-5)");
			if (userReview.rating < 1 || userReview.rating > 5)
				throw new Error("Please enter a valid rating (1-5)");
			await dispatch(addReview(userReview))
				.then(unwrapResult)
				.then(() => {
					setUserReview((prev) => ({
						...prev,
						isSubmitted: true,
					}));
					setAllowEdit(false);
				});
		} catch (error: any) {
			console.error(error);
			if (typeof error === "string") alert(error.toString());
			else if (error instanceof Error) alert(error.message);
			else alert("An error occurred");
		}
	};

	const uploadMedia = async (image: any) => {
		const blob = new Blob([image], { type: "image/png" });
		const file = new File([blob], `${user?.email}.png`, {
			type: "image/png",
		});
		const data = new FormData();
		data.append("file", file);
		console.log(data, file, blob, image);
		try {
			const res = await uploadImage(data);
			console.log(res);
		} catch (error) {
			console.error(error);
			toast.error("An error occurred");
		}
	};

	useEffect(() => {
		if (!user) return;
		dispatch(getUserReview(user?._id));
	}, [dispatch, user]);

	useEffect(() => {
		setUserReview({
			user: globalReview?.user ?? {
				_id: "",
				name: "",
				email: "",
				role: "user",
			},
			title: globalReview?.title ?? "",
			content: globalReview?.content ?? "",
			rating: globalReview?.rating ?? 0,
			date: globalReview?.date ?? Date.now().toString(),
			isSubmitted: globalReview?.isSubmitted ?? false,
		});
		setAllowEdit(userReview.isSubmitted ? false : true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [globalReview]);

	return (
		<article className={classes("")}>
			<h1 className={classes("-header")}>My Review</h1>
			<div className={classes("-container")}>
				{userReview.isSubmitted && !allowEdit ? (
					<div className={classes("-container__review")}>
						<div className={classes("-container__review--header")}>
							<Avatar
								src={userReview.user?.avatar}
								alt={userReview.user?.name}
								size="medium"
							/>
							<div
								className={classes(
									"-container__review--header__info"
								)}
							>
								<h2
									className={classes(
										"-container__review--header__info--name"
									)}
								>
									{userReview.user?.name}
								</h2>
								<p
									className={classes(
										"-container__review--header__info--date"
									)}
								>
									{moment(userReview.date).format(
										"DD MMM YYYY"
									)}
								</p>
							</div>
						</div>
						<p className={classes("-container__review--content")}>
							{userReview.content}
						</p>
						<div className={classes("-container__review--rating")}>
							{Array.from({ length: 5 }, (_, i) =>
								i < userReview.rating ? (
									<AiTwotoneStar
										key={i}
										width={32}
										height={32}
									/>
								) : (
									<AiOutlineStar
										key={i}
										width={32}
										height={32}
									/>
								)
							)}
							<AiOutlineEdit
								style={{
									marginLeft: "auto",
								}}
								onClick={() => setAllowEdit(true)}
							/>
						</div>
					</div>
				) : (
					<form
						className={classes("-container__form")}
						onSubmit={handleSubmit}
					>
						<Input
							placeholder="Please enter a title"
							value={userReview.title}
							onChange={(e) =>
								setUserReview((prev) => ({
									...prev,
									title: e.target.value,
								}))
							}
						/>
						<textarea
							className={classes("-container__form--textarea")}
							placeholder="Write your review here..."
							value={userReview.content}
							onChange={(e) =>
								setUserReview((prev) => ({
									...prev,
									content: e.target.value,
								}))
							}
						/>
						<div className={classes("-container__form--rating")}>
							{Array.from({ length: 5 }, (_, i) =>
								i < userReview.rating ? (
									<AiTwotoneStar
										key={i}
										onClick={() =>
											setUserReview((prev) => ({
												...prev,
												rating: i + 1,
											}))
										}
										width={32}
										height={32}
									/>
								) : (
									<AiOutlineStar
										key={i}
										onClick={() =>
											setUserReview((prev) => ({
												...prev,
												rating: i + 1,
											}))
										}
										width={32}
										height={32}
									/>
								)
							)}
						</div>
						<div className={classes("-container__form--image")}>
							<input
								type="file"
								id="file"
								onChange={(e: any) => {
									setImage(e.target.files[0]);
									uploadMedia(e.target.files[0]);
								}}
							/>
							<label
								htmlFor="file"
								style={{
									cursor: "pointer",
									marginLeft: "auto",
								}}
							>
								{image ? image.name : "Upload Image"}
							</label>
						</div>
						<Button type="submit">Submit Review</Button>
					</form>
				)}
			</div>
		</article>
	);
};

export default MyAccountReview;
