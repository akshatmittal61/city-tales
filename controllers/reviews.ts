import { RESPONSE_MESSAGES } from "@/constants/enum";
import Review from "@/models/Review";
import Walk from "@/models/Walk";
import { ApiRequest, ApiResponse } from "@/interfaces/api";

const getAllReviews = async (req: ApiRequest, res: ApiResponse) => {
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

const addReview = async (req: ApiRequest, res: ApiResponse) => {
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

export { getAllReviews, addReview };
