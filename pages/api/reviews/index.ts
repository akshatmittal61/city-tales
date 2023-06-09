import { apiConfigs } from "@/config";
import { RESPONSE_MESSAGES } from "@/constants/enum";
import { addUserReview, getAllReviews } from "@/controllers/reviews";
import connectDB from "@/db";
import authMiddleware from "@/middleware/auth";
import { isAdmin } from "@/middleware/roles";
import { ApiRequest, ApiResponse } from "@/types/api";

const handler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await connectDB();
		const { method } = req;

		switch (method) {
			case "GET":
				return isAdmin(getAllReviews)(req, res);
			case "POST":
				return authMiddleware(addUserReview)(req, res);
			default:
				res.setHeader("Allow", ["GET", "POST"]);
				return res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export default handler;

export const config = apiConfigs;
