import { Blog } from "./Blog";
import { IWalk } from "./Walk";

export interface LoginValues {
	email: string;
	password: string;
}

export interface RegisterValues {
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
	location?: string;
	phone?: string;
}

export interface ResetPasswordValues extends LoginValues {
	confirmPassword: string;
}

export type USER_ROLES = "admin" | "user" | "guest";

export interface IUser {
	_id: string;
	name: string;
	email: string;
	phone?: string;
	location?: string;
	avatar?: string;
	bookmarks?: Blog[];
	bookedEvents?: IWalk[];
	role: USER_ROLES;
	createdAt?: string | Date;
}
