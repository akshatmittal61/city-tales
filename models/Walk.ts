import { WALK } from "@/constants/enum";
import mongoose from "mongoose";

const WalkSchema = new mongoose.Schema(
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
		date: {
			type: Date,
			default: Date.now,
		},
		duration: {
			type: Number,
			default: 2,
		},
		location: {
			type: String,
		},
		map: {
			type: String,
		},
		type: {
			type: String,
			required: true,
			enum: Object.values(WALK.TYPE),
		},
		status: {
			type: String,
			required: true,
			default: WALK.STATUS.DRAFT,
			enum: Object.values(WALK.STATUS),
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
		},
		price: {
			type: Number,
		},
		razorpayLink: {
			type: String,
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
	},
	{
		timestamps: true,
	}
);

const Walk = mongoose.models.Walk || mongoose.model("Walk", WalkSchema);

export default Walk;
