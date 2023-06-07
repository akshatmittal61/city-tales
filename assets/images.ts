import rumiDarwaza from "@/public/images/rumi-darwaza.png";
import textureBg from "@/public/images/texture-bg.jpeg";

import wallpaper1 from "@/public/images/1.jpg";
import wallpaper2 from "@/public/images/2.jpg";
import wallpaper3 from "@/public/images/3.jpg";
import wallpaper4 from "@/public/images/4.jpg";
import wallpaper5 from "@/public/images/5.jpg";
import wallpaper6 from "@/public/images/6.jpg";
import wallpaper7 from "@/public/images/7.jpg";
import comingSoon from "@/public/images/coming-soon.png";
import { shuffle } from "lodash";
import { getRandomElement } from "@/utils/functions";

export const staticWallpapers = [
	wallpaper1,
	wallpaper2,
	wallpaper3,
	wallpaper4,
	wallpaper5,
	wallpaper6,
	wallpaper7,
].map((wallpaper) => wallpaper.src);

const wallpaperKeywords = shuffle([
	"space",
	"taylorswift",
	"universe",
	"dark-academia",
	"illustration,minimalist",
	"history",
	"minimalist",
	"bonfire",
	"nature",
	"aesthetic",
	"art",
	"sky",
]);

export const wallpapers = wallpaperKeywords
	.map(
		(keyword) =>
			`https://source.unsplash.com/1920x1080/?${keyword}&sig=${Math.floor(
				Math.random() * 1000
			)}`
	)
	.slice(0, 7);

export const aboutPoster = getRandomElement(wallpapers);

export { rumiDarwaza, textureBg, comingSoon };
