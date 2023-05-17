import { ReviewItem } from "@/types/Review";
import { sampleWalks } from "./landing";

export const sampleReviews: ReviewItem[] = [
	{
		user: {
			name: "John Doe",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-01-01"),
		walk: sampleWalks[0],
	},
	{
		user: {
			name: "Kimberly Smith",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-02-01"),
		walk: sampleWalks[1],
	},
	{
		user: {
			name: "Nick Jones",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-03-01"),
		walk: sampleWalks[2],
	},
	{
		user: {
			name: "Rebecca Williams",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-04-01"),
		walk: sampleWalks[3],
	},
];
