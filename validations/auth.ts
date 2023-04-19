import regex from "@/constants/regex";
import { LoginValues, RegisterValues } from "@/interfaces/auth";

const getErrorArray = (
	errors: Partial<LoginValues> | Partial<RegisterValues>
) =>
	Object.entries(errors).map(([field, message]) => ({
		field,
		message,
	}));

export const loginValidator = async (values: LoginValues) => {
	const errors: Partial<LoginValues> = {};

	if (!values.email) {
		errors.email = "Email is required";
	} else if (!regex.email.test(values.email)) {
		errors.email = "Invalid email";
	}

	if (!values.password) {
		errors.password = "Password is required";
	}

	return Object.keys(errors).length === 0
		? Promise.resolve()
		: Promise.reject(getErrorArray(errors));
};

export const registerValidator = async (values: RegisterValues) => {
	const errors: Partial<RegisterValues> = {};

	if (!values.name) {
		errors.name = "Name is required";
	} else if (!regex.name.test(values.name)) {
		errors.name = "Invalid name";
	}

	if (!values.email) {
		errors.email = "Email is required";
	} else if (!regex.email.test(values.email)) {
		errors.email = "Invalid email";
	}

	if (!values.password) {
		errors.password = "Password is required";
	} else if (!regex.password.test(values.password)) {
		errors.password =
			"Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character";
	}

	if (!values.confirmPassword) {
		errors.confirmPassword = "Confirm your password to continue";
	} else if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Passwords do not match";
	}

	return Object.keys(errors).length === 0
		? Promise.resolve()
		: Promise.reject(getErrorArray(errors));
};
