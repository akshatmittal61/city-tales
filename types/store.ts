import { Blog } from "./Blog";
import { IReview } from "./Review";
import { IWalk } from "./Walk";
import { IUser } from "./auth";

export interface UserSlice {
	user: IUser | null;
	token: string | null;
	review: IReview | null;
	bookmarks: Blog[] | null;
	bookedWalks: IWalk[] | null;
}
