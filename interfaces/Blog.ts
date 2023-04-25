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
	comments?: {
		id: string;
		user: {
			id: number;
			name: string;
			avatar: string;
		};
		content: string;
		date: Date;
	}[];
}
