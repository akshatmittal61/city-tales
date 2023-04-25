import { wallpapers } from "@/assets/images";
import { Blog } from "@/interfaces/Blog";

export const sampleBlogs: Blog[] = [
	{
		id: "17gdw1972gf91",
		title: "A Walk through the stars",
		content: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nisl eget aliquam tincidunt, nisl nisl aliquam
            tortor, eget aliquam nisl nisl eget nisl. Sed tincidunt, nisl
        `,
		date: new Date("2021-01-01"),
		coverImage: wallpapers[0].src,
		author: {
			id: "1d2gd12g1d2g1",
			name: "John Doe",
			avatar: "https://i.pravatar.cc/150?img=1",
		},
		tags: ["Space", "Universe", "Stars"],
		type: "blog",
		status: "published",
	},
	{
		id: "239fg293gf",
		title: "A tour of the universe",
		content: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nisl eget aliquam tincidunt, nisl nisl aliquam
            tortor, eget aliquam nisl nisl eget nisl. Sed tincidunt, nisl
        `,
		date: new Date("2021-03-24"),
		coverImage: wallpapers[1].src,
		author: {
			id: "1d2gd12g1d2g1",
			name: "Karl Seagel",
			avatar: "https://i.pravatar.cc/150?img=1",
		},
		tags: ["Space", "Universe", "Multiverse"],
		type: "blog",
		status: "published",
	},
	{
		id: "h28d91ho1",
		title: "A ride inside the wormholes",
		content: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nisl eget aliquam tincidunt, nisl nisl aliquam
            tortor, eget aliquam nisl nisl eget nisl. Sed tincidunt, nisl
        `,
		date: new Date("2022-07-03"),
		coverImage: wallpapers[2].src,
		author: {
			id: "1d2gd12g1d2g1",
			name: "Brian Greene",
			avatar: "https://i.pravatar.cc/150?img=1",
		},
		tags: ["Wormholes", "Time Travel", "Space"],
		type: "blog",
		status: "published",
	},
	{
		id: "2fofieh204if20",
		title: "A whirl in the Milky Way",
		content: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nisl eget aliquam tincidunt, nisl nisl aliquam
            tortor, eget aliquam nisl nisl eget nisl. Sed tincidunt, nisl
        `,
		date: new Date("2020-05-17"),
		coverImage: wallpapers[3].src,
		author: {
			id: "1d2gd12g1d2g1",
			name: "Brian Greene",
			avatar: "https://i.pravatar.cc/150?img=1",
		},
		tags: ["Galaxy", "Milky Way", "Space"],
		type: "blog",
		status: "published",
	},
];
