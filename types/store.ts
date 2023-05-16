import { IReview } from "./Review";
import { IUser } from "./auth";

export interface UserSlice {
	user: IUser | null;
	token: string | null;
	review: IReview | null;
}
