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
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Tag",
				},
			],
			default: [],
		},
		likes: {
			type: Number,
			default: 0,
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
		tourBookedBy: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		reviews: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Review",
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
