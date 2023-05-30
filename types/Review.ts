import { IUser } from "./auth";

export interface IReview {
	user: IUser;
	title: string;
	content: string;
	rating: number;
	image?: string;
	date: any;
	isSubmitted?: boolean;
}
