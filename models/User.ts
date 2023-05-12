import { USER_ROLES } from "@/constants/enum";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			unique: true,
			default: "",
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: "",
		},
		date: {
			type: Date,
			default: Date.now,
		},
		role: {
			type: String,
			default: USER_ROLES.USER,
			enum: Object.values(USER_ROLES),
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
