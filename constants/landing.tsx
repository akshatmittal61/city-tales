import { wallpapers } from "@/assets/images";
import {
	ExplorationItem,
	ReviewItem,
	WalkProps,
} from "@/components/Home/types";

export const samplePlaces = [
	"New York",
	"London",
	"California",
	"Virginia",
	"Chicago",
	"Texas",
	"Washington",
];

export const sampleHighlights: {
	image: string;
	title: string;
	link: string;
	description?: string;
}[] = wallpapers.map((wallpaper, index) => ({
	image: wallpaper.src,
	title: `Top 10 Places to Visit in ${samplePlaces[index]}`,
	link: "#",
	description:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
}));

export const sampleExplorations: ExplorationItem[] = [
	{
		image: wallpapers[0].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[1].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[2].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[3].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[4].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[5].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[6].src,
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
];

export const sampleWalks: WalkProps[] = [
	{
		title: "Tour in the stars",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris.",
		image: wallpapers[1].src,
		link: "/",
		slotsLeft: 10,
	},
	{
		title: "A Walk among the flowers",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris.",
		image: wallpapers[2].src,
		link: "/",
		slotsLeft: 15,
	},
];

export const sampleReviews: ReviewItem[] = [
	{
		user: {
			name: "John Doe",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-01-01"),
		title: "The London Eye",
		image: wallpapers[0].src,
	},
	{
		user: {
			name: "Kimberly Smith",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-02-01"),
		title: "Big Ben",
		image: wallpapers[1].src,
	},
	{
		user: {
			name: "Nick Jones",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-03-01"),
		title: "The Shard",
		image: wallpapers[2].src,
	},
	{
		user: {
			name: "Rebecca Williams",
		}.name,
		rating: 4,
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		date: new Date("2020-04-01"),
		title: "Piccadilly Circus",
		image: wallpapers[3].src,
	},
];
