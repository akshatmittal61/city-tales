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
	// avatar should be a valid url or empty string, a valid url should start with http:// or https:// and end with .png, .jpg, .jpeg, .gif, .svg or .webp or it can be data:image/png;base64, or data:image/jpeg;base64, or data:image/gif;base64, or data:image/svg+xml;base64,
	avatar: /^(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)(.png|.jpg|.jpeg|.gif|.svg|.webp)$|^data:image\/(png|jpeg|gif|svg\+xml);base64,/,
	// otp should be a valid otp, contain only numbers and have a length of 6 characters
	otp: /^[0-9\b]+$/,
	// location should be a valid location, contain letters, spaces, special characters and have a length of 2-30 characters
	location: /^[a-zA-Z0-9 !@#$%^&*)(,+=._-]{2,50}$/,
};

export default regex;
