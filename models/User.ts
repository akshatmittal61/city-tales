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
			default: "",
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default:
				"https://raw.githubusercontent.com/akshatmittal61/planner/master/src/images/user.svg",
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
		location: {
			type: String,
			default: "",
		},
		bookmarks: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Blog",
				},
			],
			default: [],
		},
		bookedEvents: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Walk",
				},
			],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
