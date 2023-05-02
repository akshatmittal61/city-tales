import { wallpapers } from "@/assets/images";
import { ExplorationItem, WalkItem } from "@/components/Home/types";

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
	image: wallpaper,
	title: `Top 10 Places to Visit in ${samplePlaces[index]}`,
	link: "#",
	description:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
}));

export const sampleExplorations: ExplorationItem[] = [
	{
		image: wallpapers[0],
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[1],
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[2],
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[3],
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[4],
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[5],
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
	{
		image: wallpapers[6],
		title: "Sample Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam massa, eget aliquam nisl nunc vel mauris.",
		link: "/",
	},
];

export const sampleWalks: WalkItem[] = [
	{
		id: "qowfij1qh30",
		title: "Tour in the stars",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris.",
		image: wallpapers[1],
		slotsLeft: 10,
	},
	{
		id: "d2039fj20f",
		title: "A Walk among the flowers",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris.",
		image: wallpapers[2],
		slotsLeft: 15,
	},
	{
		id: "2i3f20i3njgpqjp",
		title: "Land of the giants",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris.",
		image: wallpapers[3],
		slotsLeft: 5,
	},
	{
		id: "d23fgq2g3g4",
		title: "Magical forest",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nunc nisl sit amet mauris.",
		image: wallpapers[4],
		slotsLeft: 20,
	},
];
