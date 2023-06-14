import { TImageCategories } from "@/types/files";
import { http } from "../http";

export const uploadImage = async (url: any, category: TImageCategories) => {
	try {
		const res: any = await http.post(
			"/upload",
			JSON.stringify({ url, category })
		);
		return Promise.resolve(res.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error);
	}
};
