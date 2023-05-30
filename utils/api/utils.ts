import { http } from "../http";

export const uploadImage = async (file: any) => {
	try {
		const res: any = http.post("/upload", file, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return res.data;
	} catch (error: any) {
		console.error(error);
		return null;
	}
};
