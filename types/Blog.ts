import { IUser } from "./auth";

export interface BlogComment {
	_id: string;
	user: {
		id: string;
		name: string;
		avatar: string;
	};
	content: string;
	date: Date;
	replies?: BlogComment[];
}

export interface Blog {
	id: string;
	_id: string;
	title: string;
	content: string;
	user: {
		id: string;
		name: string;
		avatar: string;
	};
	coverImage?: string;
	date?: Date;
	excerpt?: string;
	location?: string;
	type: string;
	status: string;
	tags?: string[];
	likes?: IUser[];
	bookmarks?: IUser[];
	comments?: BlogComment[];
}
