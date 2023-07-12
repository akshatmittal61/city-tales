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

export const fetchAllUsers = async () => {
	try {
		const res = await http.get("/admin/users");
		return Promise.resolve(res.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const fetchAllBlogs = async () => {
	try {
		const res = await http.get("/admin/blogs");
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

export const fetchAllReviews = async () => {
	try {
		const res = await http.get("/reviews");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const toggleReviewApproval = async (id: string) => {
	try {
		const res = await http.patch("/reviews/approve", { id });
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const approveReview = async (id: string) => {
	try {
		const res = await http.patch("/reviews/approve", { id });
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const rejectReview = async (id: string) => {
	try {
		const res = await http.patch("/reviews/reject", { id });
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const approveMultipleReviews = async (ids: string[]) => {
	try {
		const res = await http.patch("/reviews/approve/multiple", { ids });
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const rejectMultipleReviews = async (ids: string[]) => {
	try {
		const res = await http.patch("/reviews/reject/multiple", { ids });
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const fetchAllWalks = async () => {
	try {
		const res = await http.get("/walks");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const postAWalk = async (walk: any) => {
	try {
		const response = await http.post("/walks", walk);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const patchWalk = async (id: string, walk: any) => {
	try {
		const response = await http.patch(`/walks/${id}`, walk);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};
