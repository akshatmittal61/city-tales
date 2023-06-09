const path = require("path");

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
		dangerouslyAllowSVG: true,
		domains: ["localhost"],
	},
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	api: {
		bodyParser: {
			sizeLimit: "5mb",
		},
	},
};

module.exports = nextConfig;
