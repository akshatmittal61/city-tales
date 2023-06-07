import { BLOG, RESPONSE_MESSAGES, WALK } from "@/constants/enum";
import Blog from "@/models/Blog";
import Review from "@/models/Review";
import User from "@/models/User";
import Walk from "@/models/Walk";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getStats = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const users = await User.countDocuments();
		const blogs = await Blog.countDocuments();
		const publishedBlogs = await Blog.countDocuments({
			status: BLOG.STATUS.PUBLISHED,
		});
		const draftBlogs = await Blog.countDocuments({
			status: BLOG.STATUS.DRAFT,
		});
		const reviews = await Review.countDocuments();
		const approvedReviews = await Review.countDocuments({ approved: true });
		const walks = await Walk.countDocuments();
		const availableTours = await Walk.countDocuments({
			status: WALK.STATUS.PUBLISHED,
			type: WALK.STATUS.AVAILABLE,
		});
		return res.status(200).json({
			data: {
				users: {
					total: users,
				},
				blogs: {
					total: blogs,
					published: publishedBlogs,
					draft: draftBlogs,
				},
				reviews: {
					total: reviews,
					approved: approvedReviews,
				},
				walks: {
					total: walks,
					available: availableTours,
				},
			},
			message: RESPONSE_MESSAGES.SUCCESS,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
