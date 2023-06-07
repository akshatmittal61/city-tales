import { RESPONSE_MESSAGES, WALK } from "@/constants/enum";
import User from "@/models/User";
import Walk from "@/models/Walk";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getAllWalks = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const walks = await Walk.find()
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.populate({
				path: "tourBookedBy",
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

export const getPublishedWalks = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const walks = await Walk.find({ status: WALK.STATUS.PUBLISHED })
			.populate({
				path: "user",
				select: "name email avatar",
			})
			.populate({
				path: "tourBookedBy",
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
		const walk = await Walk.findById(id).populate({
			path: "tourBookedBy",
			select: "name email avatar",
		});
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
		console.log(req.body);
		let {
			title,
			content,
			date,
			location,
			coverImage,
			slots,
			price,
			tags,
			type,
			razorpayLink,
		} = req.body;
		if (
			!title ||
			!content ||
			!date ||
			!location ||
			!coverImage ||
			!slots ||
			!price ||
			!type ||
			!Object.values(WALK.TYPE).includes(type)
		)
			return res.status(400).json({ message: "Invalid request" });
		const newWalkBody: any = {
			title,
			content,
			date,
			location,
			coverImage,
			slots,
			price,
			tags,
			type,
			user: req.user.id,
			status: WALK.STATUS.DRAFT,
			razorpayLink,
		};
		if (req.body.map) newWalkBody.map = req.body.map;
		const newWalk = new Walk(newWalkBody);
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

export const bookWalk = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const walk = await Walk.findById(id);
		const user = await User.findById(req.user.id);
		if (!walk) return res.status(404).json({ message: "Walk not found" });
		walk.tourBookedBy.push(req.user.id);
		user.bookedEvents.push(id?.toString());
		await walk.save();
		await user.save();
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

export const getBookedWalks = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const user = await User.findById(req.user.id).populate(
			"bookedEvents",
			"title content coverImage"
		);
		if (!user) return res.status(404).json({ message: "User not found" });
		return res.json({
			data: user.bookedEvents,
			message: RESPONSE_MESSAGES.SUCCESS,
		});
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Walk not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
