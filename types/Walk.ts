import { IUser } from "./auth";
import { Blog } from "./Blog";
import { IReview } from "./Review";
import { ITag } from "./Tag";

export interface IWalk {
	_id: string;
	title: string;
	content: string;
	date: Date | string;
	excerpt: string;
	location?: string;
	tourBookedBy: IUser[];
	coverImage: string;
	slots: number;
	price: number;
	tags: ITag[];
	reviews: IReview[];
	blog?: Blog;
	duration?: number;
	type: "upcoming" | "available";
	status: "draft" | "published" | "archived";
}
