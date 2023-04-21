import { RESPONSE_MESSAGES } from "@/constants/enum";
import { NextApiRequest, NextApiResponse } from "next";
import { loginValidator, registerValidator } from "@/validations/auth";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/config";
import { ApiRequest, ApiResponse } from "@/interfaces/api";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
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
		user = new User({ name, email, password });
		user.password = await bcrypt.hash(password, 10);
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

const login = async (req: NextApiRequest, res: NextApiResponse) => {
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
			return res.status(400).json({ message: "Invalid credentials" });
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

const getAuthenicatedUser = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		return res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

/* const logout = async (req: NextApiRequest, res: NextApiResponse) => {};

const forgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {};

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {};

const updateDetails = async (req: NextApiRequest, res: NextApiResponse) => {};

const updatePassword = async (req: NextApiRequest, res: NextApiResponse) => {}; */

export {
	register,
	login,
	getAuthenicatedUser,
	/* logout,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword, */
};
