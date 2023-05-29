import { http } from "../http";

export const fetchAllWalks = async () => {
	try {
		const response = await http.get("/walks");
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchWalkById = async (id: string) => {
	try {
		const response = await http.get(`/walks/${id}`);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};
