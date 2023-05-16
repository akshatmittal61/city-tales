import { IReview } from "@/types/Review";
import { http } from "../http";

export const fetchReview = async (userId: string) => {
	try {
		const response = await http.get(`/reviews/${userId}`);
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const postReview = async (review: IReview) => {
	try {
		const response = await http.post("/reviews", review);
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};
