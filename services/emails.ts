import { googleClientId, googleEmail, googleRefreshToken } from "@/config";
import myOAuth2Client from "./gauth";
import { toast } from "react-toastify";
import { createTransport } from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
	try {
		myOAuth2Client.setCredentials({
			refresh_token: googleRefreshToken,
		});
		const accessToken = await myOAuth2Client.getAccessToken();
		const transportOptions: any = {
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: googleEmail,
				clientId: googleClientId,
				refreshToken: googleRefreshToken,
				accessToken: accessToken.token,
			},
		};
		const smtpTransport = createTransport(transportOptions);
		const mailOptions = {
			from: googleEmail,
			to,
			subject,
			html,
		};
		await smtpTransport.sendMail(mailOptions);
	} catch (error: any) {
		console.error(error);
		toast.error(error.message ?? "Error sending email");
	}
};
