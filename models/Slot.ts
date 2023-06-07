import { SLOT } from "@/constants/enum";
import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
	{
		blog: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		},
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		bookedBy: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		status: {
			type: String,
			enum: Object.values(SLOT.STATUS),
			default: SLOT.STATUS.AVAILABLE,
		},
	},
	{
		timestamps: true,
	}
);

const Slot = mongoose.models.Slot || mongoose.model("Slot", SlotSchema);

export default Slot;
