import { RESPONSE_MESSAGES } from "@/constants/enum";
import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import Review from "@/models/Review";
import User from "@/models/User";
import Walk from "@/models/Walk";
import Otp from "@/models/otp";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getAllUsers = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const allUsers = await User.find();
		return res
			.status(200)
			.json({ message: RESPONSE_MESSAGES.SUCCESS, data: allUsers });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const deleteUser = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { id } = req.query;
		const foundUser = await User.findById(id).select("-password");
		if (!foundUser)
			return res.status(404).json({ message: "User not found" });
		await Blog.deleteMany({ user: id });
		await Walk.deleteMany({ user: id });
		await Review.deleteMany({ user: id });
		await Comment.deleteMany({ user: id });
		await Otp.deleteMany({ email: foundUser.email });
		await Blog.updateMany(
			{
				$or: [
					{ likes: { $in: [id] } },
					{ comments: { $in: [id] } },
					{ bookmarks: { $in: [id] } },
				],
			},
			{
				$pull: {
					likes: id,
					comments: id,
					bookmarks: id,
				},
			}
		);
		await Walk.updateMany(
			{
				tourBookedBy: { $in: [id] },
			},
			{
				$pull: {
					tourBookedBy: id,
				},
			}
		);
		await User.findByIdAndDelete(id);
		return res
			.status(200)
			.json({ message: RESPONSE_MESSAGES.SUCCESS, data: foundUser });
	} catch (error: any) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "User not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
