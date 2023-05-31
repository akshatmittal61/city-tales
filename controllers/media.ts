import { ApiResponse } from "@/types/api";
import fs from "fs";

export const uploadFile = async (req: any, res: ApiResponse) => {
	try {
		// console.log(JSON.stringify(req.body));
		// console.log("%j", req.body);
		const formDataObject = Object.fromEntries(
			new URLSearchParams(req.body)
		);
		console.log(formDataObject);
		// write the file in local data folder using fs
		// const { file } = req.files;
		const file = req.body;
		fs.writeFileSync(`${process.cwd()}/data/${file.name}`, file, {
			flag: "a+",
			encoding: "binary",
		});
		/* const { name } = file;
		await file.mv(`${process.cwd()}/data/${name}`);
		const newPath = `${process.cwd()}/data/${name}`; */
		return res.status(200).json({ message: "File uploaded" });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};
