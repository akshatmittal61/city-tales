import { BLOG } from "@/constants/enum";
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		excerpt: {
			type: String,
			required: true,
		},
		location: {
			type: String,
		},
		type: {
			type: String,
			enum: Object.values(BLOG.TYPE),
			default: BLOG.TYPE.STORY,
		},
		status: {
			type: String,
			enum: Object.values(BLOG.STATUS),
			default: BLOG.STATUS.DRAFT,
		},
		tags: {
			type: [String],
			default: [],
		},
		likes: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		comments: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Comment",
				},
			],
			default: [],
		},
		bookmarks: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
