import { IUser } from "./auth";

export interface ReviewItem {
	user: IUser;
	content: string;
	rating: number;
	date: Date | string;
	image?: string;
}

export interface IReview {
	user: IUser;
	content: string;
	rating: number;
	date: any;
	isSubmitted?: boolean;
}
