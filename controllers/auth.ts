import { OTP_TYPES, RESPONSE_MESSAGES } from "@/constants/enum";
import { loginValidator, registerValidator } from "@/validations/auth";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/config";
import { ApiRequest, ApiResponse } from "@/types/api";
import regex from "@/constants/regex";
import { IUser } from "@/types/auth";
import otpGenerator from "otp-generator";
import { sendPasswordResetOtp, sendRegistrationOtp } from "@/utils/emails";
import Otp from "@/models/otp";

export const register = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { name, email, password } = req.body;
		let errors: any = null;
		await registerValidator({
			name,
			email,
			password,
			confirmPassword: password,
		}).catch((err) => {
			errors = err;
		});
		if (errors) {
			return res.status(400).json({ errors });
		}
		let user = await User.findOne({ email });
		if (user)
			return res.status(400).json({ message: "Email already in use" });
		const foundOtp = await Otp.findOne({
			email,
			type: OTP_TYPES.REGISTER,
			verified: true,
		});
		if (!foundOtp)
			return res.status(400).json({ message: "Verify your email first" });
		user = new User({ name, email, password });
		user.password = await bcrypt.hash(password, 10);
		if (req.body.phone) {
			if (!regex.phone.test(req.body.phone))
				return res
					.status(400)
					.json({ message: "Invalid phone number provided" });
			else user.phone = req.body.phone;
		}
		if (req.body.location) {
			if (!regex.location.test(req.body.location))
				return res
					.status(400)
					.json({ message: "Invalid location provided" });
			else user.location = req.body.location;
		}
		await user.save();
		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(payload, jwtSecret, { expiresIn: "1d" }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({ token });
		});
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const login = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { email, password } = req.body;
		let errors: any = null;
		await loginValidator({ email, password }).catch((err) => {
			errors = err;
		});
		if (errors) {
			return res.status(400).json({ errors });
		}
		let user = await User.findOne({ email });
		if (!user)
			return res
				.status(400)
				.json({ message: "Please register to continue" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });
		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(payload, jwtSecret, { expiresIn: "1d" }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({ token });
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getAuthenicatedUser = async (
	req: ApiRequest,
	res: ApiResponse
) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		return res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const updateDetails = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { name, phone, avatar } = req.body;
		const user: IUser = await User.findById(req.user.id).select(
			"-password"
		);
		if (!user) return res.status(404).json({ message: "User not found" });
		if (!name && !phone && !avatar)
			return res.status(400).json({ message: "Invalid request" });
		const updateDetails: Partial<IUser> = {};
		type KeysToUpdate = "name" | "phone" | "avatar" | "location";
		const keysToUpdate: KeysToUpdate[] = [
			"name",
			"phone",
			"avatar",
			"location",
		];
		keysToUpdate.forEach((key: KeysToUpdate) => {
			if (key in req.body) {
				if (!regex[key].test(req.body[key])) {
					return res
						.status(400)
						.json({ message: `Invalid ${key} provided` });
				}
				updateDetails[key] = req.body[key];
			}
		});
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{ $set: updateDetails },
			{ new: true }
		).select("-password");
		return res
			.status(200)
			.json({ user: updatedUser, message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getRegistrationOtp = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { email } = req.body;
		if (!email)
			return res.status(400).json({ message: "Email is required" });
		if (!regex.email.test(email))
			return res.status(400).json({ message: "Invalid email provided" });
		const findUser = await User.findOne({ email });
		if (findUser)
			return res.status(403).json({ message: "Email already in use" });
		const foundOtp = await Otp.findOne({ email, type: OTP_TYPES.REGISTER });
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
			digits: true,
		});
		await sendRegistrationOtp(email, otp);
		if (foundOtp) {
			await Otp.updateOne(
				{ email, type: OTP_TYPES.REGISTER },
				{ otp, verified: false, date: new Date() }
			);
		} else {
			await Otp.create({ email, otp, type: OTP_TYPES.REGISTER });
		}
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const verifyRegistrationOtp = async (
	req: ApiRequest,
	res: ApiResponse
) => {
	try {
		const { email, otp } = req.body;
		if (!email)
			return res.status(400).json({ message: "Please provide email" });
		if (!otp)
			return res.status(400).json({ message: "Please provide OTP" });
		if (!regex.email.test(email))
			return res.status(400).json({ message: "Invalid email provided" });
		if (!regex.otp.test(otp))
			return res.status(400).json({ message: "Invalid OTP provided" });
		const foundOtp = await Otp.findOne({
			email,
			otp,
			type: OTP_TYPES.REGISTER,
		});
		if (!foundOtp)
			return res.status(400).json({ message: "Invalid OTP provided" });
		if (foundOtp.verified)
			return res.status(400).json({ message: "OTP already verified" });
		if (foundOtp.date.getTime() + 5 * 60 * 1000 < Date.now())
			return res.status(400).json({ message: "OTP expired" });
		if (foundOtp.otp !== otp)
			return res.status(400).json({ message: "Invalid OTP provided" });
		await Otp.updateOne(
			{ email, otp, type: OTP_TYPES.REGISTER },
			{ verified: true }
		);
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getForgotPasswordOtp = async (
	req: ApiRequest,
	res: ApiResponse
) => {
	try {
		const { email } = req.body;
		if (!email)
			return res.status(400).json({ message: "Email is required" });
		if (!regex.email.test(email))
			return res.status(400).json({ message: "Invalid email provided" });

		const user = await User.findOne({ email });
		if (!user)
			return res.status(403).json({ message: "You are not registered" });

		const foundOtp = await Otp.findOne({
			email,
			type: OTP_TYPES.RESET_PASSWORD,
		});
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
			digits: true,
		});
		await sendPasswordResetOtp(email, otp);
		if (foundOtp) {
			await Otp.updateOne(
				{ email, type: OTP_TYPES.RESET_PASSWORD },
				{ otp, verified: false, date: new Date() }
			);
		} else {
			await Otp.create({ email, otp, type: OTP_TYPES.RESET_PASSWORD });
		}
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const verifyForgotPasswordOtp = async (
	req: ApiRequest,
	res: ApiResponse
) => {
	try {
		const { email, otp } = req.body;
		if (!email)
			return res.status(400).json({ message: "Please provide email" });
		if (!otp)
			return res.status(400).json({ message: "Please provide OTP" });
		if (!regex.email.test(email))
			return res.status(400).json({ message: "Invalid email provided" });
		if (!regex.otp.test(otp))
			return res.status(400).json({ message: "Invalid OTP provided" });
		const foundOtp = await Otp.findOne({
			email,
			otp,
			type: OTP_TYPES.RESET_PASSWORD,
		});
		if (!foundOtp)
			return res.status(400).json({ message: "Invalid OTP provided" });
		if (foundOtp.verified)
			return res.status(400).json({ message: "OTP already verified" });
		if (foundOtp.date.getTime() + 5 * 60 * 1000 < Date.now())
			return res.status(400).json({ message: "OTP expired" });
		if (foundOtp.otp !== otp)
			return res.status(400).json({ message: "Invalid OTP provided" });
		await Otp.updateOne(
			{ email, otp, type: OTP_TYPES.RESET_PASSWORD },
			{ verified: true }
		);
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const resetPassword = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { email, otp, password } = req.body;
		if (!email)
			return res.status(400).json({ message: "Please provide email" });
		if (!otp)
			return res.status(400).json({ message: "Please provide OTP" });
		if (!password)
			return res.status(400).json({ message: "Please provide password" });
		if (!regex.email.test(email))
			return res.status(400).json({ message: "Invalid email provided" });
		if (!regex.otp.test(otp))
			return res.status(400).json({ message: "Invalid OTP provided" });
		if (!regex.password.test(password))
			return res
				.status(400)
				.json({ message: "Invalid password provided" });

		const foundUser = await User.findOne({ email });

		if (!foundUser)
			return res.status(404).json({ message: "User not registered" });

		const foundOtp = await Otp.findOne({
			email,
			otp,
			type: OTP_TYPES.RESET_PASSWORD,
		});
		if (!foundOtp)
			return res.status(400).json({ message: "Invalid OTP provided" });
		if (!foundOtp.verified)
			return res.status(400).json({ message: "OTP not verified" });
		if (foundOtp.date.getTime() + 5 * 60 * 1000 < Date.now())
			return res.status(400).json({ message: "OTP expired" });
		if (foundOtp.otp !== otp)
			return res.status(400).json({ message: "Invalid OTP provided" });
		const passwordHash = await bcrypt.hash(password, 10);
		await User.updateOne({ email }, { password: passwordHash });
		await Otp.updateOne(
			{ email, otp, type: OTP_TYPES.RESET_PASSWORD },
			{ verified: false }
		);
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

/* const logout = async (req: ApiRequest, res: ApiResponse) => {};

const resetPassword = async (req: ApiRequest, res: ApiResponse) => {};


const updatePassword = async (req: ApiRequest, res: ApiResponse) => {}; */
