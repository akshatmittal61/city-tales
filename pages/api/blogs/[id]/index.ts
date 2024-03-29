import { apiConfigs } from "@/config";
import { RESPONSE_MESSAGES } from "@/constants/enum";
import { deleteBlog, getBlogById, updateBlog } from "@/controllers/blogs";
import connectDB from "@/db";
import { isAdmin } from "@/middleware/roles";
import { ApiRequest, ApiResponse } from "@/types/api";

const handler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await connectDB();
		const { method } = req;

		switch (method) {
			case "GET":
				return getBlogById(req, res);
			case "PATCH":
				return isAdmin(updateBlog)(req, res);
			case "DELETE":
				return isAdmin(deleteBlog)(req, res);
			default:
				res.setHeader("Allow", ["GET", "POST"]);
				res.status(405).end(`Method ${method} Not Allowed`);
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
