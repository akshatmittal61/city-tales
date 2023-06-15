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
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { uploadImage } from "@/utils/api/utils";

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

const classes = stylesConfig(styles, "my-account-review");

interface MyAccountReviewProps {}

const MyAccountReview: React.FC<MyAccountReviewProps> = () => {
	const user = useSelector(userSelector);
	const dispatch = useDispatch<any>();
	const globalReview = useSelector(reviewSelector);
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
		image: globalReview?.image ?? "",
	});
	const [loading, setLoading] = useState(false);
	const [allowEdit, setAllowEdit] = useState(
		userReview.isSubmitted ? false : true
	);

	const handleImageUpload = async (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		setLoading(true);
		const imageDataURL = await new Promise((resolve, reject) => {
			reader.onloadend = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
		});
		const res = await uploadImage(imageDataURL, "reviews");
		setLoading(false);
		return res?.data;
	};

	const replaceAllBlobImages = async (content: string) => {
		const regex = /<img src="(.+?)"/g;
		const images = content.match(regex);
		if (images) {
			let newContent = content;
			for (const image of images) {
				const initialImageUrl = image.match(/<img src="(.+?)"/)?.[1];
				let imgUrlAfterUpload = initialImageUrl;
				if (
					(initialImageUrl && initialImageUrl.startsWith("blob")) ||
					(initialImageUrl && initialImageUrl.startsWith("data:"))
				) {
					const imgFile = await fetch(initialImageUrl).then((res) =>
						res.blob()
					);
					imgUrlAfterUpload = await handleImageUpload(imgFile);
				}
				newContent = newContent.replace(
					image,
					`<img src="${imgUrlAfterUpload}"`
				);
			}
			return newContent;
		}
		return content;
	};

	const saveContent = async (content: string) => {
		const newContent = await replaceAllBlobImages(content);
		setUserReview((prev) => ({
			...prev,
			content: newContent,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
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
		} finally {
			setLoading(false);
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
						<p
							className={classes("-container__review--content")}
							dangerouslySetInnerHTML={{
								__html: userReview.content,
							}}
						/>
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
							label="Title"
							placeholder="Please enter a title"
							value={userReview.title}
							onChange={(e) =>
								setUserReview((prev) => ({
									...prev,
									title: e.target.value,
								}))
							}
						/>
						<SunEditor
							onChange={(content: string) => saveContent(content)}
							defaultValue={userReview.content}
							setOptions={{
								width: "100%",
								height: "auto",
								minHeight: "100px",
								maxHeight: "100%",
								buttonList: [
									["font", "fontSize", "formatBlock"],
									[
										"bold",
										"underline",
										"italic",
										"strike",
										"subscript",
										"superscript",
										"link",
									],
									["image", "fontColor", "align", "list"],
									[
										"undo",
										"redo",
										"removeFormat",
										"preview",
										"print",
									],
								],
							}}
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
						<Button loading={loading} type="submit">
							Submit Review
						</Button>
					</form>
				)}
			</div>
		</article>
	);
};

export default MyAccountReview;
