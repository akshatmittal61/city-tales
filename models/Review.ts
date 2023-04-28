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
		rating: {
			type: Number,
			required: true,
			//
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
