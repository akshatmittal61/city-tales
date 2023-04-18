import { RESPONSE_MESSAGES } from "@/constants/enum";
import { getAllBlogs } from "@/controllers/blogs";
import connectDB from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await connectDB();
		const { method } = req;

		switch (method) {
			case "GET":
				return getAllBlogs(req, res);
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
