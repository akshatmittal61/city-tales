import { RESPONSE_MESSAGES } from "@/constants/enum";
import { uploadImageToS3 } from "@/services/files";
import { ApiRequest, ApiResponse } from "@/types/api";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const imageDataUrl = req.body.url;
		const category = req.body.category;
		if (!imageDataUrl || !category)
			return res
				.status(400)
				.json({ message: "Image data or category is missing" });
		const base64Data = imageDataUrl.split(";base64,").pop();
		const imageBuffer = Buffer.from(base64Data, "base64");
		const fileName = `${category}/${Date.now()}-${uuidv4()}.png`;
		const imageUrl = await uploadImageToS3(imageBuffer, fileName);
		return res
			.status(200)
			.json({ message: RESPONSE_MESSAGES.SUCCESS, data: imageUrl });
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
