import { http } from "../http";

export const fetchAllBlogs = async () => {
	try {
		const response = await http.get("/blogs");
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchBlogById = async (id: string) => {
	try {
		const response = await http.get(`/blogs/${id}`);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
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

export const patchBlog = async (id: string, blog: any) => {
	try {
		const response = await http.patch(`/blogs/${id}`, blog);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const deleteBlog = async (id: string) => {
	try {
		const response = await http.delete(`/blogs/${id}`);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const toggleLikeBlog = async (id: string) => {
	try {
		const response = await http.patch(`/blogs/${id}/like`);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const postComment = async (id: string, comment: any) => {
	try {
		const response = await http.post(`/blogs/${id}/comment`, comment);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const toggleBookmark = async (id: string) => {
	try {
		const response = await http.patch(`/blogs/${id}/bookmark`);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchBookmarkedBlogs = async () => {
	try {
		const response = await http.get("/blogs/bookmark");
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const postReplyToComment = async (id: string, reply: any) => {
	try {
		const response = await http.post(`/blogs/${id}/reply`, reply);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};
