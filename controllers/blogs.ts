import { BLOG, RESPONSE_MESSAGES, USER_ROLES } from "@/constants/enum";
import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getBlogs = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const blogs: any = await Blog.find({ status: BLOG.STATUS.PUBLISHED })
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: blogs, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getAllBlogs = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const blogs: any = await Blog.find()
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: blogs, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getBlogById = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const blog: any = await Blog.findById(id)
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.populate({
				path: "likes",
				select: "name email avatar",
			})
			.populate({
				path: "comments",
				populate: {
					path: "replies",
					populate: {
						path: "user",
						model: "User",
						select: "name email avatar",
					},
				},
			})
			.populate({
				path: "comments",
				populate: {
					path: "user",
					model: "User",
					select: "name email avatar",
				},
			})
			.populate({
				path: "bookmarks",
				select: "name email avatar",
			});
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		return res
			.status(200)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Blog not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const addBlog = async (req: ApiRequest, res: ApiResponse) => {
	try {
		let {
			title,
			content,
			type,
			status,
			tags,
			coverImage,
			excerpt,
			location,
		} = req.body;
		if (!title || !content || !type || !status || !coverImage)
			return res.status(400).json({ message: "Invalid request" });
		// if excerpt is not provided, set it to first 100 characters of content, content is in html format, remove all the tags
		if (!excerpt) {
			const regex = /(<([^>]+)>)/gi;
			excerpt = content.replace(regex, "").substring(0, 100);
		}
		// if type is not provided or not an array, set it to story, else check if all the values are valid
		if (!type || !Array.isArray(type)) type = [BLOG.TYPE.STORY];
		else if (
			!type.every((type: string) =>
				Object.values(BLOG.TYPE).includes(type)
			)
		)
			type = [BLOG.TYPE.STORY];
		// if status is not one of the allowed status, set it to draft
		if (!Object.values(BLOG.STATUS).includes(status))
			status = BLOG.STATUS.DRAFT;
		const blog = new Blog({
			user: req.user.id,
			title,
			content,
			type,
			status,
			tags,
			coverImage,
			excerpt,
			location,
		});
		await blog.save();
		return res
			.status(201)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const updateBlog = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const blog = await Blog.findById(id);
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		let { title, content, type, status, tags, coverImage, excerpt } =
			req.body;
		if (!title || !content || !type || !status || !coverImage)
			return res.status(400).json({ message: "Invalid request" });
		// if excerpt is not provided, set it to first 100 characters of content
		if (!excerpt) {
			const regex = /(<([^>]+)>)/gi;
			excerpt = content.replace(regex, "").substring(0, 100);
		}
		// if type is not provided or not an array, set it to story, else check if all the values are valid
		if (!type || !Array.isArray(type)) type = [BLOG.TYPE.STORY];
		else if (
			!type.every((type: string) =>
				Object.values(BLOG.TYPE).includes(type)
			)
		)
			type = [BLOG.TYPE.STORY];
		// if status is not one of the allowed status, set it to draft
		if (!Object.values(BLOG.STATUS).includes(status))
			status = BLOG.STATUS.DRAFT;
		blog.title = title;
		blog.content = content;
		blog.type = type;
		blog.status = status;
		blog.tags = tags;
		blog.coverImage = coverImage;
		blog.excerpt = excerpt;
		await blog.save();
		return res
			.status(200)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Blog not found" });
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const toggleBlogLike = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const blog = await Blog.findById(id);
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		const isLiked = blog.likes.find(
			(likedUser: any) => likedUser.toString() === req.user.id
		);
		if (isLiked) {
			blog.likes = blog.likes.filter(
				(likedUser: any) => likedUser.toString() !== req.user.id
			);
		} else {
			blog.likes.push(req.user.id);
		}
		await blog.save();
		await blog.populate({
			path: "likes",
			select: "name email avatar",
		});
		await blog.populate({
			path: "comments",
			populate: {
				path: "user",
				model: "User",
				select: "name email avatar",
			},
		});
		await blog.populate({
			path: "bookmarks",
			select: "name email avatar",
		});
		return res
			.status(200)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Blog not found" });
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const addCommentToBlog = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const { content } = req.body;
		if (!content)
			return res.status(400).json({ message: "Invalid request" });
		const blog = await Blog.findById(id);
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		const newComment = new Comment({
			user: req.user.id,
			blog: blog._id.toString(),
			content,
			date: new Date(),
		});
		await newComment.save();
		blog.comments.push(newComment._id);
		await blog.save();
		await newComment.populate({
			path: "user",
			select: "name email avatar",
		});
		return res
			.status(201)
			.json({ data: newComment, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Blog not found" });
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const addReplyToComment = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const { content } = req.body;
		if (!content)
			return res.status(400).json({ message: "Invalid request" });
		const comment = await Comment.findById(id);
		if (!comment)
			return res.status(404).json({ message: "Comment not found" });
		const newComment = new Comment({
			user: req.user.id,
			blog: comment.blog.toString(),
			content,
			date: new Date(),
		});
		await newComment.save();
		comment.replies.push(newComment._id);
		await comment.save();
		await comment.populate("replies");
		await newComment.populate({
			path: "user",
			select: "name email avatar",
		});
		return res
			.status(201)
			.json({ data: newComment, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Comment not found" });
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const toggleBookmark = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const loggedInUser = await User.findById(req.user.id);
		const blog = await Blog.findById(id);
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		const isBookmarked =
			blog.bookmarks?.find(
				(bookmarkedUser: any) =>
					bookmarkedUser.toString() === req.user.id
			) ||
			loggedInUser.bookmarks?.find(
				(bookmarkedBlog: any) => bookmarkedBlog.toString() === blog._id
			);
		if (isBookmarked) {
			blog.bookmarks = blog.bookmarks?.filter(
				(bookmarkedUser: any) =>
					bookmarkedUser.toString() !== req.user.id
			);
			loggedInUser.bookmarks = loggedInUser.bookmarks?.filter(
				(bookmarkedBlog: any) =>
					bookmarkedBlog.toString() !== blog._id.toString()
			);
		} else {
			if (blog.bookmarks && Array.isArray(blog.bookmarks))
				blog.bookmarks?.push(req.user.id);
			else blog.bookmarks = [req.user.id];
			if (loggedInUser.bookmarks && Array.isArray(loggedInUser.bookmarks))
				loggedInUser.bookmarks?.push(blog._id);
			else loggedInUser.bookmarks = [blog._id];
		}
		await blog.save();
		await loggedInUser.save();
		await blog.populate({
			path: "likes",
			select: "name email avatar",
		});
		await blog.populate({
			path: "comments",
			populate: {
				path: "user",
				model: "User",
				select: "name email avatar",
			},
		});
		await blog.populate({
			path: "bookmarks",
			select: "name email avatar",
		});
		return res
			.status(200)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Blog not found" });
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getBookmarkedBlogs = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const loggedInUser = await User.findById(req.user.id);
		const blogs = await Blog.find({
			_id: { $in: loggedInUser.bookmarks },
		})
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: blogs, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getShowcaseBlogs = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const blogs = await Blog.find({
			type: { $in: [BLOG.TYPE.SHOWCASE] },
			status: BLOG.STATUS.PUBLISHED,
		})
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: blogs, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getExplorationBlogs = async (
	req: ApiRequest,
	res: ApiResponse
) => {
	try {
		const blogs = await Blog.find({
			type: { $in: [BLOG.TYPE.EXPLORATION] },
			status: BLOG.STATUS.PUBLISHED,
		})
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: blogs, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const deleteBlog = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const blog = await Blog.findById(id);
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		await Blog.findByIdAndDelete(id);
		await User.updateMany(
			{ bookmarks: { $in: [id] } },
			{ $pull: { bookmarks: id } }
		);
		await Comment.deleteMany({ blog: id });
		return res
			.status(200)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Blog not found" });
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const deleteComment = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id, commentId } = req.query;
		const blog = await Blog.findById(id);
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		const comment = await Comment.findById(commentId);
		if (!comment)
			return res.status(404).json({ message: "Comment not found" });
		// if logged in user is not the owner of the comment or the admin, return unauthorized
		const user = await User.findById(req.user.id);
		if (
			comment.user.toString() !== req.user.id &&
			user.role !== USER_ROLES.ADMIN
		)
			return res
				.status(401)
				.json({ message: "You cannot delete this comment" });
		// delete all replies of the comment
		await Comment.deleteMany({ _id: { $in: comment.replies } });
		// delete comment from blog
		await Blog.updateOne({ _id: id }, { $pull: { comments: commentId } });
		// delete comment
		await Comment.findByIdAndDelete(commentId);
		return res
			.status(200)
			.json({ data: comment, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Comment not found" });
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
