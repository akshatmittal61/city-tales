import { RESPONSE_MESSAGES } from "@/constants/enum";
import User from "@/models/User";
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
