import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		rating: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		approved: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
