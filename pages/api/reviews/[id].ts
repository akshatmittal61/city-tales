import { RESPONSE_MESSAGES } from "@/constants/enum";
import { getReviewByWalkId } from "@/controllers/reviews";
import connectDB from "@/db";
import { ApiRequest, ApiResponse } from "@/interfaces/api";

const handler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await connectDB();
		const { method } = req;

		switch (method) {
			case "GET":
				return getReviewByWalkId(req, res);
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
