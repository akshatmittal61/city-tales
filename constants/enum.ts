const USER_ROLES = {
	ADMIN: "admin",
	USER: "user",
	GUEST: "guest",
};

const OTP_TYPES = {
	REGISTER: "register",
	RESET_PASSWORD: "reset_password",
};

const RESPONSE_MESSAGES = {
	SUCCESS: "Success",
	FAILED: "Failed",
	SERVER_ERROR: "Internal Server Error",
};

const BLOG: any = {
	TYPE: {
		STORY: "story",
		WALK: "walk",
	},
	STATUS: {
		DRAFT: "draft",
		PUBLISHED: "published",
		ARCHIVED: "archived",
	},
};

const SLOT: any = {
	STATUS: {
		AVAILABLE: "available",
		BOOKED: "booked",
	},
};

export { USER_ROLES, OTP_TYPES, RESPONSE_MESSAGES, BLOG, SLOT };
