import mongoose from "mongoose";

const WalkSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
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
	tourBookedBy: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		default: [],
	},
	coverImage: {
		type: String,
		required: true,
	},
	slots: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
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
	reviews: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Review",
			},
		],
		default: [],
	},
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog",
	},
});

const Walk = mongoose.models.Walk || mongoose.model("Walk", WalkSchema);

export default Walk;
