import { Blog } from "./Blog";

export interface ITag {
	_id: string;
	name: string;
	blogs: Blog[];
}
