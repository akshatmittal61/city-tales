import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		blog: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		},
		content: {
			type: String,
			required: true,
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

const Comment =
	mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
