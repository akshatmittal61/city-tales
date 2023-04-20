import { LoginValues, RegisterValues } from "@/interfaces/auth";
import { http } from "../http";

const registerUser = async (user: RegisterValues) => {
	try {
		const response = await http.post("/auth/register", user);
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

const loginUser = async (user: LoginValues) => {
	try {
		const response = await http.post("/auth/login", user);
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

const fetchAuthenticatedUser = async () => {
	try {
		const response = await http.get("/auth/verify");
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export { registerUser, loginUser, fetchAuthenticatedUser };
