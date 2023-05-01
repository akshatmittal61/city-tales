import User from "@/models/User";

const getUserById = async (id: string) => {
	try {
		const user: any = await User.findById(id);
		if (!user) return null;
		return user;
	} catch (error: any) {
		console.error(error);
		return null;
	}
};

export { getUserById };
