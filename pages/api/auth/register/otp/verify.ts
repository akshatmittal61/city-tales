import { apiConfigs } from "@/config";
import { RESPONSE_MESSAGES } from "@/constants/enum";
import { verifyRegistrationOtp } from "@/controllers/auth";
import connectDB from "@/db";
import { ApiRequest, ApiResponse } from "@/types/api";

const handler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await connectDB();
		const { method } = req;

		switch (method) {
			case "POST":
				return verifyRegistrationOtp(req, res);
			default:
				res.setHeader("Allow", ["POST"]);
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
