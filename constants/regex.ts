const regex = {
	// email should be a valid email, contain @ and . and have a length of 2-5 characters
	email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
	// password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
	// phone should be a valid phone number, contain only numbers and have a length of 10 characters
	phone: /^\d{10}$/,
	// name should be a valid name, contain only letters and spaces and have a length of 2-30 characters
	name: /^[a-zA-Z ]{2,30}$/,
	// number should be a valid number, contain only numbers and have a length of 10 characters
	number: /^\d{10}$/,
	// avatar should be a valid url or empty string
	avatar: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))?$/,
};

export default regex;
