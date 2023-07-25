import { OTP_TYPES } from "@/constants/enum";
import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		otp: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			default: OTP_TYPES.REGISTER,
			enum: Object.values(OTP_TYPES),
		},
		verified: {
			type: Boolean,
			default: false,
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

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

export default Otp;
