import { IReview } from "@/types/Review";

export const sampleReviews: IReview[] = [
	{
		user: {
			_id: "1",
			name: "John Doe",
			email: "akshatmittal2506@gmail.com",
			role: "user",
		},
		rating: 4,
		title: "Sample title",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-01-01"),
	},
	{
		user: {
			_id: "1",
			name: "Kimberly Smith",
			email: "akshatmittal2506@gmail.com",
			role: "user",
		},
		rating: 4,
		title: "Sample title",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-02-01"),
	},
	{
		user: {
			_id: "1",
			name: "Nick Jones",
			email: "akshatmittal2506@gmail.com",
			role: "user",
		},
		rating: 4,
		title: "Sample title",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-03-01"),
	},
	{
		user: {
			_id: "1",
			name: "Rebecca Williams",
			email: "akshatmittal2506@gmail.com",
			role: "user",
		},
		rating: 4,
		title: "Sample title",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-04-01"),
	},
];
