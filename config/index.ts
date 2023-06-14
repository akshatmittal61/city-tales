export const dbUri: string =
	process.env.NEXT_PUBLIC_APP_DB_URI ?? "mongodb://localhost:27017/nextjs";
export const jwtSecret: string =
	process.env.NEXT_PUBLIC_APP_JWT_SECRET ?? "secret";
export const awsBucketName = process.env
	.NEXT_PUBLIC_APP_AWS_BUCKET_NAME as string;
export const awsAccessKeyId = process.env
	.NEXT_PUBLIC_APP_AWS_ACCESS_KEY_ID as string;
export const awsSecretAccessKey = process.env
	.NEXT_PUBLIC_APP_AWS_SECRET_ACCESS_KEY as string;

export const apiConfigs = {
	api: {
		responseLimit: false,
	},
};
