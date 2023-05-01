import { WalkItem } from "@/components/Home/types";

export interface ReviewItem {
	user: string;
	content: string;
	rating: number;
	date: Date | string;
	walk: WalkItem;
}
