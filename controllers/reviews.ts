import { RESPONSE_MESSAGES } from "@/constants/enum";
import Review from "@/models/Review";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getAllReviews = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const reviews: any = await Review.find()
			.populate("user")
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: reviews, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getUserReview = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const foundReview = await Review.findOne({
			user: req.query.id,
		}).populate("user");
		if (!foundReview)
			return res.status(404).json({ message: "Review not found" });
		return res.status(200).json({
			data: {
				...foundReview._doc,
				isSubmitted: true,
			},
			message: RESPONSE_MESSAGES.SUCCESS,
		});
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Review not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const updateUserReview = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { rating, content } = req.body;
		if (!rating && !content)
			return res.status(400).json({ message: "Invalid request" });
		const foundReview = await Review.findOne({ user: req.user.id });
		if (!foundReview)
			return res.status(404).json({ message: "Review not found" });
		if (rating) foundReview.rating = rating % 6;
		if (content) foundReview.content = content;
		foundReview.approved = false;
		await foundReview.save();
		await foundReview.populate("user");
		return res
			.status(200)
			.json({ data: foundReview, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Review not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const addUserReview = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { rating, content } = req.body;
		if (!rating || !content)
			return res.status(400).json({ message: "Invalid request" });
		const foundReview = await Review.findOne({ user: req.user.id });
		if (foundReview) {
			return updateUserReview(req, res);
		}
		const newReview = new Review({
			user: req.user.id,
			rating: rating % 6,
			content,
		});
		await newReview.save();
		await newReview.populate("user");
		return res
			.status(200)
			.json({ data: newReview, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const deleteReview = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const foundReview = await Review.findById(id);
		if (!foundReview)
			return res.status(404).json({ message: "Review not found" });
		await foundReview.remove();
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Review not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const toggleReviewApproval = async (
	req: ApiRequest,
	res: ApiResponse
) => {
	try {
		const { id } = req.query;
		const foundReview = await Review.findById(id);
		if (!foundReview)
			return res.status(404).json({ message: "Review not found" });
		foundReview.approved = !foundReview.approved;
		await foundReview.save();
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Review not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getReviewById = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const review: any = await Review.findById(id).populate("user");
		if (!review)
			return res.status(404).json({ message: "Review not found" });
		return res
			.status(200)
			.json({ data: review, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Review not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getApprovedReviews = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const reviews: any = await Review.find({ approved: true })
			.populate("user")
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: reviews, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
