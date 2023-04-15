import { RESPONSE_MESSAGES } from "@/constants/enum";
import Blog from "@/models/Blog";
import { NextApiRequest, NextApiResponse } from "next";

const getAllBlogs = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const blogs: any = await Blog.find()
			.populate("users")
			.sort({ createdAt: -1 });
		return res
			.status(200)
			.json({ data: blogs, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const getBlogById = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { id } = req.query;
		const blog: any = await Blog.findById(id).populate("users");
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		return res
			.status(200)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Blog not found" });
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export { getAllBlogs, getBlogById };
