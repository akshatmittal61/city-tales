import { BLOG } from "@/constants/enum";

const createUpdatelog = async (blog: any) => {
	if (!blog.title) {
		throw new Error("Title is required");
	}
	if (!blog.content) {
		throw new Error("Please write some content");
	}
	if (
		!blog.type ||
		!Array.isArray(blog.type) ||
		!blog.type.every((type: string) =>
			Object.values(BLOG.TYPE).includes(type)
		)
	) {
		throw new Error("Please select a valid type");
	}
	if (!blog.coverImage) {
		throw new Error("Please upload a cover image");
	}
	if (!Object.values(BLOG.STATUS).includes(blog.status)) {
		throw new Error("Please select a valid status");
	}
};

export { createUpdatelog };
