import { WalkItem } from "@/components/Home/types";
import { IUser } from "./auth";

export interface ReviewItem {
	user: string;
	content: string;
	rating: number;
	date: Date | string;
	walk: WalkItem;
}

export interface IReview {
	user: IUser | null;
	content: string;
	rating: number;
	date: any;
	isSubmitted: boolean;
}
