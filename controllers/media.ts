import { ApiResponse } from "@/types/api";

export const uploadFile = async (req: any, res: ApiResponse) => {
	try {
		console.log(req.body.file);
		// write the file in local data folder using fs
		const { file } = req.files;
		const { name } = file;
		await file.mv(`${process.cwd()}/data/${name}`);
		const newPath = `${process.cwd()}/data/${name}`;
		return res
			.status(200)
			.json({ message: "File uploaded", data: { name, url: newPath } });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};
