import { getAllBlogs } from "@/controllers/blogs";
import connectDB from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	connectDB();
	const { method } = req;

	switch (method) {
		case "GET":
			return getAllBlogs(req, res);
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};

export default handler;
