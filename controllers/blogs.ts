import { BLOG, RESPONSE_MESSAGES } from "@/constants/enum";
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
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
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
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

const addBlog = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let {
			title,
			content,
			type,
			status,
			tags,
			coverImage,
			excerpt,
			location,
		} = req.body;
		if (!title || !content || !type || !status || !coverImage)
			return res.status(400).json({ message: "Invalid request" });
		// if excerpt is not provided, set it to first 100 characters of content
		if (!excerpt)
			excerpt =
				content.length > 100 ? content.substring(0, 100) : content;
		// if type is not one of the allowed types, set it to story
		if (!Object.values(BLOG.TYPE).includes(type)) type = BLOG.TYPE.STORY;
		// if status is not one of the allowed status, set it to draft
		if (!Object.values(BLOG.STATUS).includes(status))
			status = BLOG.STATUS.DRAFT;
		const blog = new Blog({
			title,
			content,
			type,
			status,
			tags,
			coverImage,
			excerpt,
			location,
		});
		await blog.save();
		return res
			.status(201)
			.json({ data: blog, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export { getAllBlogs, getBlogById, addBlog };
