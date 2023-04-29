export const getRandomElement = <T>(arr: T[]): T => {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
};

export const openLink = (link: string) => window.open(link, "_blank");

export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

export const random = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffle = (array: any[]) => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

export const sleep = (seconds: number) =>
	new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const max = (a: number, b: number) => (a > b ? a : b);
export const min = (a: number, b: number) => (a < b ? a : b);

export const debounce = (func: any, wait: number) => {
	let timeout: any;
	return (e: any) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(e);
		}, wait);
	};
};

// function to get a random ID
export const randomId = () => Math.floor(Math.random() * 1000000000);

// if a key exists on an object return value of that key else return null
export const getValueFromKey = (obj: any, key: string) => {
	if (obj && obj[key]) {
		return obj[key];
	}
	return null;
};

// function to covert in lowercase, removing spaces, and removing special characters, uppercase to lowercase
export const convertToSlug = (text: string) => {
	return text
		.toLowerCase()
		.replace(/ /g, "")
		.replace(/[^\w-]+/g, "");
};

// function to convert a slug (kebab case) text to running case sentence
export const convertToSentence = (text: string) => {
	return text
		?.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
		.replace(/-/g, " ")
		.replace(/_/g, " ");
};

// function to convert a slug (kebab case) text to running case sentence
export const stylesConfig =
	(styles: any, prefix: string = "") =>
	(...args: any[]) => {
		const classes: any[] = [];
		args.forEach((arg) => {
			if (typeof arg === "string")
				classes.push(styles[`${prefix}${arg}`]);
			else if (typeof arg === "object")
				Object.keys(arg).forEach((key) => {
					if (arg[key]) classes.push(styles[`${prefix}${key}`]);
				});
		});
		return classes.join(" ");
	};

// function to omit keys from an object
export const omitKeys = (obj: any, keys: string[]) => {
	const newObj: any = {};
	Object.keys(obj).forEach((key) => {
		if (!keys.includes(key)) {
			newObj[key] = obj[key];
		}
	});
	return newObj;
};

// function to get a element from an array
export const getElementFromArray = (
	arr: any[],
	currentIndex?: number,
	direction?: "next" | "prev" | "random" | "first" | "last" | "current"
) => {
	if (!arr.length) return null;
	if (!currentIndex) return arr[0];
	const n = arr.length;
	switch (direction) {
		case "next":
			return arr[(currentIndex + 1) % n];
		case "prev":
			return arr[(currentIndex + n - 1) % n];
		case "random":
			return arr[Math.floor(Math.random() * n)];
		case "first":
			return arr[0];
		case "last":
			return arr[n - 1];
		case "current":
			return arr[currentIndex % n];
		default:
			return arr[currentIndex % n];
	}
};
