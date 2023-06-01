import { http } from "../http";

export const fetchStats = async () => {
	try {
		const res = await http.get("/admin/stats");
		return Promise.resolve(res.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const fetchAllBlogs = async () => {
	try {
		const res = await http.get("/blogs");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const postBlog = async (blog: any) => {
	try {
		const response = await http.post("/blogs", blog);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};
