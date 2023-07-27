import React, { useEffect, useState } from "react";
import { Blog, BlogComment } from "@/types/Blog";
import styles from "@/styles/Blog.module.scss";
import { stylesConfig } from "@/utils/functions";
import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { CommentPane } from "@/components/Blog";
import { useSelector } from "react-redux";
import { userSelector } from "@/global/slices/user";
import { useRouter } from "next/router";
import useAuth from "@/hooks/auth";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { toast } from "react-toastify";
import {
	fetchBlogById,
	toggleBookmark,
	toggleLikeBlog,
} from "@/utils/api/blogs";
import { USER_ROLES, WALK } from "@/constants/enum";
import _ from "lodash";

const classes = stylesConfig(styles, "blog");

const BlogPage: React.FC<Blog> = (props) => {
	const authState = useAuth();
	const user = useSelector(userSelector);
	const router = useRouter();

	const [liking, setLiking] = useState(false);
	const [bookmarking, setBookmarking] = useState(false);
	const [showCommentPane, setShowCommentPane] = useState(false);
	const [currentStory, setCurrentStory] = useState<Blog>({
		id: props._id,
		_id: props._id,
		title: props.title,
		content: props.content,
		excerpt: props.excerpt,
		coverImage: props.coverImage,
		likes: props.likes,
		comments: props.comments,
		bookmarks: props.bookmarks,
		user: props.user,
		type: props.type,
		status: props.status,
		tags: props.tags,
		date: props.date,
	});

	const handleLike = () => {
		if ((!authState.loading && !authState.loggedIn) || !user) {
			router.push({
				pathname: "/login",
				query: { redirect: router.asPath },
			});
			return;
		}
		setLiking(true);
		try {
			toggleLikeBlog(currentStory._id)
				.then((res) => {
					setCurrentStory((prev) => ({
						...prev,
						likes: res.data.likes,
					}));
				})
				.catch((err) => {
					throw err;
				});
		} catch (error: any) {
			console.error(error);
			toast.error(error.message);
		} finally {
			setLiking(false);
		}
	};

	const handleBookmark = () => {
		if ((!authState.loading && !authState.loggedIn) || !user) {
			router.push({
				pathname: "/login",
				query: { redirect: router.asPath },
			});
			return;
		}
		setBookmarking(true);
		try {
			toggleBookmark(currentStory._id)
				.then((res) => {
					setCurrentStory((prev) => ({
						...prev,
						bookmarks: res.data.bookmarks,
					}));
				})
				.catch((err) => {
					throw err;
				});
		} catch (error: any) {
			console.error(error);
			toast.error(error.message);
		} finally {
			setBookmarking(false);
		}
	};

	const handleShare = () => {
		if (typeof window !== "undefined") {
			if (navigator.canShare?.() && navigator.share)
				navigator
					.share({
						title: currentStory.title,
						text: currentStory.content,
						url: window.location.href,
					})
					.then(() => console.log("Successfuly shared"))
					.catch((error) => console.log("Error sharing", error));
			else {
				navigator.clipboard.writeText(window.location.href);
				toast.success("Link copied to clipboard");
			}
		}
	};

	useEffect(() => {
		if (
			currentStory.status !== WALK.STATUS.PUBLISHED &&
			authState.user?.role !== USER_ROLES.ADMIN
		)
			router.push("/stories");
	}, [authState.user?.role, currentStory.status, router]);

	return (
		<>
			<div className={classes("")}>
				<div
					className={classes("-cover")}
					style={{
						backgroundImage: `url(${
							currentStory.coverImage
								? currentStory.coverImage
								: "/images/rumi-darwaza.png"
						})`,
					}}
				></div>
				<div className={classes("-window")}>
					<div className={classes("-header")}>
						<h1 className={classes("-header__title")}>
							{currentStory.title}
						</h1>
						<div className={classes("-header__actions")}>
							{authState.loading ? null : (
								<>
									<button
										className={classes(
											"-header__actions__button"
										)}
										onClick={handleLike}
									>
										{currentStory.likes?.length ?? null}
										{!authState.user ? (
											<AiOutlineLike />
										) : liking ? (
											<span
												className={classes(
													"-header__actions__button__loading"
												)}
											/>
										) : currentStory.likes
												?.map((user) => user?._id)
												?.includes(
													authState.user?._id
												) ? (
											<AiFillLike />
										) : (
											<AiOutlineLike />
										)}
									</button>
									<button
										className={classes(
											"-header__actions__button"
										)}
										onClick={() =>
											setShowCommentPane(!showCommentPane)
										}
									>
										{currentStory.comments?.length ?? null}
										<AiOutlineComment />
									</button>
									<button
										className={classes(
											"-header__actions__button"
										)}
										onClick={handleBookmark}
									>
										{currentStory.bookmarks?.length ?? null}
										{!authState.user ? (
											<RiBookmarkLine />
										) : bookmarking ? (
											<span
												className={classes(
													"-header__actions__button__loading"
												)}
											/>
										) : currentStory.bookmarks
												?.map((user) => user?._id)
												?.includes(
													authState.user?._id
												) ? (
											<RiBookmarkFill />
										) : (
											<RiBookmarkLine />
										)}
									</button>
								</>
							)}
							<button
								className={classes("-header__actions__button")}
								onClick={handleShare}
							>
								<IoMdShare />
							</button>
						</div>
					</div>
					<div
						className={classes("-content")}
						dangerouslySetInnerHTML={{
							__html: currentStory.content,
						}}
					/>
				</div>
			</div>
			{showCommentPane ? (
				<CommentPane
					blogId={currentStory._id}
					comments={currentStory.comments ?? []}
					close={() => setShowCommentPane(false)}
					setComments={(newComments: BlogComment[]) => {
						console.log(newComments);
						setCurrentStory((prev) => ({
							...prev,
							comments: newComments,
						}));
					}}
				/>
			) : null}
		</>
	);
};

export default BlogPage;

export const getServerSideProps = async (context: any) => {
	const { params } = context;
	const { slug } = params;
	const id = slug[0];

	try {
		const res = await fetchBlogById(id);
		let returnOptions: any = {
			props: JSON.parse(JSON.stringify(res.data)),
		};
		if (slug[1] !== _.kebabCase(res.data.title)) {
			returnOptions.redirect = {
				destination: `/stories/${id}/${_.kebabCase(res.data.title)}`,
				permanent: true,
			};
		}
		return returnOptions;
	} catch (error) {
		console.log(error);
		return {
			props: {
				error: "Something went wrong",
			},
		};
	}
};
