import { RESPONSE_MESSAGES } from "@/constants/enum";
import Review from "@/models/Review";
import { NextApiRequest, NextApiResponse } from "next";

const getAllReviews = async (req: NextApiRequest, res: NextApiResponse) => {
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

export { getAllReviews };
