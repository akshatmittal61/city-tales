import { RESPONSE_MESSAGES } from "@/constants/enum";
import { addBlog, getAllBlogs } from "@/controllers/blogs";
import connectDB from "@/db";
import { ApiRequest, ApiResponse } from "@/types/api";
import { isAdmin } from "@/middleware/roles";
import { apiConfigs } from "@/config";

const handler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await connectDB();
		const { method } = req;

		switch (method) {
			case "GET":
				return getAllBlogs(req, res);
			case "POST":
				return isAdmin(addBlog)(req, res);
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
