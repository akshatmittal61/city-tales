export interface LoginValues {
	email: string;
	password: string;
}

export interface RegisterValues {
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

type USER_ROLES = "admin" | "user" | "guest";

export interface IUser {
	name: string;
	email: string;
	phone?: string;
	avatar?: string;
	role: USER_ROLES;
}
