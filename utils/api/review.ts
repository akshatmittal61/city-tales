import { http } from "../http";

export const fetchApprovedReviews = async () => {
	try {
		const res = await http.get("/reviews/approve");
		return res.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};
