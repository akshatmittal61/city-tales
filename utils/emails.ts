import { sendEmail } from "@/services/emails";
import { toast } from "react-toastify";

export const sendRegistrationOtp = async (to: string, otp: string) => {
	try {
		const title = "Welcome to City Tales. Verify your email";
		const html = `
            <div>
                <h1>${title}</h1>
                <p>Your OTP is ${otp}</p>
                <span style="color: red;">Do not share this OTP with anyone</span>
                <span style="opacity: 0.5;">If you did not request this email, please ignore it.</span>
            </div>
        `;
		await sendEmail(to, title, html);
	} catch (error: any) {
		console.error(error);
		toast.error(error.message ?? "Error sending email");
	}
};

export const sendPasswordResetOtp = async (to: string, otp: string) => {
	try {
		const title = "Reset your password";
		const html = `
            <div>
                <h1>${title}</h1>
                <p>Your OTP is ${otp}</p>
                <span style="color: red;">Do not share this OTP with anyone</span>
                <span style="opacity: 0.5;">If you did not request this email, please ignore it.</span>
            </div>
        `;
		await sendEmail(to, title, html);
	} catch (error: any) {
		console.error(error);
		toast.error(error.message ?? "Error sending email");
	}
};
