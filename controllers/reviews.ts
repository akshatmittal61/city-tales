import { RESPONSE_MESSAGES } from "@/constants/enum";
import Review from "@/models/Review";
import Walk from "@/models/Walk";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getAllReviews = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const reviews: any = await Review.find()
			.populate("user")
			.populate("walk")
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

export const getReviewByWalkId = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const foundWalk = await Walk.findById(id);
		if (!foundWalk)
			return res.status(404).json({ message: "Walk not found" });
		const reviews: any = await Review.find({ walk: id })
			.populate("user")
			.populate("walk")
			.sort({ createdAt: -1 });
		if (!reviews)
			return res.status(404).json({ message: "Reviews not found" });
		return res
			.status(200)
			.json({ data: reviews, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Reviews not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const addWalkReview = async (req: ApiRequest, res: ApiResponse) => {
	try {
		let { user, walk, rating, content } = req.body;
		if (!user || !walk || !rating || !content)
			return res.status(400).json({ message: "Invalid request" });
		const foundWalk = await Walk.findById(walk.id);
		if (!foundWalk)
			return res.status(404).json({ message: "Walk not found" });
		const newReview = new Review({
			user: req.user.id,
			walk: foundWalk._id.toString(),
			rating: rating % 6,
			content,
		});
		await newReview.save();
		return res
			.status(200)
			.json({ data: newReview, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Walk not found" });
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
