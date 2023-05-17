export interface BlogComment {
	id: string;
	user: {
		id: string;
		name: string;
		avatar: string;
	};
	content: string;
	date: Date;
}

export interface Blog {
	id: string;
	title: string;
	content: string;
	author: {
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
	likes?: number;
	bookmarked?: boolean;
	comments?: BlogComment[];
}
