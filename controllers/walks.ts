import { RESPONSE_MESSAGES, WALK } from "@/constants/enum";
import Walk from "@/models/Walk";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getAllWalks = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const walks = await Walk.find()
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.sort({ createdAt: -1 });
		return res.json({ data: walks, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getWalkById = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const walk = await Walk.findById(id).populate("user", "tourBookedBy");
		if (!walk) return res.status(404).json({ message: "Walk not found" });
		return res.json({ data: walk, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Walk not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const addWalk = async (req: ApiRequest, res: ApiResponse) => {
	try {
		let {
			title,
			content,
			date,
			excerpt,
			location,
			coverImage,
			slots,
			price,
			tags,
			type,
		} = req.body;
		if (
			!title ||
			!content ||
			!date ||
			!location ||
			!coverImage ||
			!slots ||
			!price ||
			!type
		)
			return res.status(400).json({ message: "Invalid request" });
		if (!excerpt) excerpt = content.slice(0, 100);
		const newWalk = new Walk({
			title,
			content,
			date,
			excerpt,
			location,
			coverImage,
			slots,
			price,
			tags,
			user: req.user.id,
			status: WALK.STATUS.DRAFT,
		});
		await newWalk.save();
		return res.json({ data: newWalk, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const publishWalk = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const walk = await Walk.findById(id);
		if (!walk) return res.status(404).json({ message: "Walk not found" });
		walk.status = WALK.STATUS.PUBLISHED;
		await walk.save();
		return res.json({ data: walk, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Walk not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const archiveWalk = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const walk = await Walk.findById(id);
		if (!walk) return res.status(404).json({ message: "Walk not found" });
		walk.status = WALK.STATUS.ARCHIVED;
		await walk.save();
		return res.json({ data: walk, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Walk not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
