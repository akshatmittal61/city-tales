import aws from "aws-sdk";
import { awsAccessKeyId, awsBucketName, awsSecretAccessKey } from "@/config";

const s3 = new aws.S3({
	accessKeyId: awsAccessKeyId,
	secretAccessKey: awsSecretAccessKey,
});

export const uploadImageToS3 = async (fileBuffer: Buffer, fileName: string) => {
	try {
		const params = {
			Bucket: awsBucketName,
			Key: fileName,
			Body: fileBuffer,
			ContentEncoding: "base64",
			ContentType: "image/png",
		};
		const result = await s3.upload(params).promise();
		return Promise.resolve(result.Location);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
