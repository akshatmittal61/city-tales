import { wallpapers } from "@/assets/images";

export const samplePlaces = [
	"New York",
	"London",
	"California",
	"Virginia",
	"Chicago",
	"Texas",
	"Washington",
];

export const carouselItems: {
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
