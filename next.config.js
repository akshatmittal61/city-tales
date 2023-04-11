const path = require("path");

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
		dangerouslyAllowAllLocals: true,
		dangerouslyAllowHttpProtocols: true,
		dangerouslyAllowStaticImages: true,
		dangerouslyAllowSVG: true,
		domains: ["localhost"],
	},
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
};

module.exports = nextConfig;
