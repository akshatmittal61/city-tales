import { WALK } from "@/constants/enum";

const createUpdateWalk = async (walk: any) => {
	if (!walk.title) throw new Error("Title is required");
	if (!walk.content) throw new Error("Content is required");
	if (!walk.coverImage) throw new Error("Cover image is required");
	if (!walk.location) throw new Error("Location is required");
	if (!walk.map) throw new Error("Please enter the map link");
	if (!walk.type || !Object.values(WALK.TYPE).includes(walk.type))
		throw new Error("Invalid walk type");
	if (walk.type === WALK.TYPE.UPCOMING) {
		if (!walk.date) throw new Error("Date is required");
		if (!walk.razorpayLink) throw new Error("Razorpay link is required");
		if (!walk.price) throw new Error("Price is required");
	}
	if (!Object.values(WALK.STATUS).includes(walk.status))
		throw new Error("Invalid walk status");
};

export { createUpdateWalk };
