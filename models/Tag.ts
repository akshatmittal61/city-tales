import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		blogs: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Blog",
				},
			],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Tag = mongoose.models.Tag || mongoose.model("Tag", TagSchema);

export default Tag;
