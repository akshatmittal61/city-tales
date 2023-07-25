import { LoginValues, RegisterValues } from "@/types/auth";
import { http } from "../http";

export const register = async (user: RegisterValues) => {
	try {
		const response = await http.post("/auth/register", user);
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const login = async (user: LoginValues) => {
	try {
		const response = await http.post("/auth/login", user);
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const fetchAuthenticatedUser = async () => {
	try {
		const response = await http.get("/auth/verify");
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const patchUserDetails = async (user: {
	name?: string;
	phone?: string;
	avatar?: string;
}) => {
	try {
		const response = await http.patch("/auth/update", user);
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const getRegistraionOtp = async (email: string) => {
	try {
		const response = await http.post("/auth/register/otp", { email });
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const verifyRegistrationOtp = async (email: string, otp: string) => {
	try {
		const response = await http.post("/auth/register/otp/verify", {
			email,
			otp,
		});
		return Promise.resolve(response.data);
	} catch (error: any) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};
