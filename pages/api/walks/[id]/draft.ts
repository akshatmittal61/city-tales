import { RESPONSE_MESSAGES } from "@/constants/enum";
import connectDB from "@/db";
import { ApiRequest, ApiResponse } from "@/types/api";
import { draftWalk } from "@/controllers/walks";
import { isAdmin } from "@/middleware/roles";
import { apiConfigs } from "@/config";

const handler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await connectDB();
		const { method } = req;

		switch (method) {
			case "PATCH":
				return isAdmin(draftWalk)(req, res);
			default:
				res.setHeader("Allow", ["PATCH"]);
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
