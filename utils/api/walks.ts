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

export const fetchPublishedWalks = async () => {
	try {
		const response = await http.get("/walks/published");
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

export const bookWalk = async (id: string) => {
	try {
		const response = await http.patch(`/walks/${id}/book`);
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchBookedWalks = async () => {
	try {
		const response = await http.get("/walks/booked");
		return Promise.resolve(response.data);
	} catch (error) {
		console.error(error);
		return [];
	}
};
