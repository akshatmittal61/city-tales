// Server Configs
export const dbUri: string =
	process.env.NEXT_PUBLIC_APP_DB_URI ??
	"mongodb://localhost:27017/city-tales";
export const jwtSecret: string =
	process.env.NEXT_PUBLIC_APP_JWT_SECRET ?? "secret";

// AWS Configs
export const awsBucketName = process.env
	.NEXT_PUBLIC_APP_AWS_BUCKET_NAME as string;
export const awsAccessKeyId = process.env
	.NEXT_PUBLIC_APP_AWS_ACCESS_KEY_ID as string;
export const awsSecretAccessKey = process.env
	.NEXT_PUBLIC_APP_AWS_SECRET_ACCESS_KEY as string;

// Google Auth Configs
export const googleClientId = process.env
	.NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID as string;
export const googleClientSecret = process.env
	.NEXT_PUBLIC_APP_GOOGLE_CLIENT_SECRET as string;
export const googleRefreshToken = process.env
	.NEXT_PUBLIC_APP_GOOGLE_REFRESH_TOKEN as string;
export const googleRedirectUri = process.env
	.NEXT_PUBLIC_APP_GOOGLE_REDIRECT_URI as string;
export const googleEmail = process.env.NEXT_PUBLIC_APP_GOOGLE_EMAIL as string;

export const apiConfigs = {
	api: {
		bodyParser: {
			sizeLimit: "100mb",
		},
		responseLimit: false,
	},
};
