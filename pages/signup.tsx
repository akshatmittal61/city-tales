import styles from "@/styles/Auth.module.scss";
import React, { useEffect, useState } from "react";
import { stylesConfig } from "@/utils/functions";
import { rumiDarwaza } from "@/assets/images";
import Avatar from "@/components/Avatar/Avatar";
import { primaryLogo4 } from "@/assets/vectors";
import Input from "@/library/Input";
import Button from "@/library/Button";
import Link from "next/link";
import regex from "@/constants/regex";
import { registerValidator } from "@/validations/auth";
import { RegisterValues } from "@/types/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { registerUser } from "@/global/helpers/user";
import { unwrapResult } from "@reduxjs/toolkit";

const classNames = stylesConfig(styles, "auth");

const SignInPage: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch<any>();
	const [inputCred, setInputCred] = useState<RegisterValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [otp, setOtp] = useState(Array(6).fill(""));
	const [showOTPBox, setShowOTPBox] = useState(false);
	const [isOtpValid, setIsOtpValid] = useState(false);
	const [resendOTPTimeout, setResendOTPTimeout] = useState(60);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputCred((prev) => ({ ...prev, [name]: value }));
	};

	const requestOTP = async (e?: any) => {
		e?.preventDefault();
		setShowOTPBox(true);
		setResendOTPTimeout(60);
	};

	const verifyOTP = async (otp: number[] | string[]) => {
		if (
			otp.join("").length !== 6 ||
			(otp.join("").length === 6 && otp.some((n: any) => isNaN(n)))
		) {
			alert("Invalid OTP entered");
			requestOTP();
			return;
		}
		setIsOtpValid(true);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isOtpValid) {
			alert("OTP is not verified");
			verifyOTP(otp);
			return;
		}
		try {
			await registerValidator(inputCred).catch((err) => {
				throw err.map((err: any) => err.message).join(", ");
			});
			await dispatch(registerUser(inputCred))
				.then(unwrapResult)
				.then(() => {
					router.push("/login");
				})
				.catch((err: any) => {
					console.error(err);
					alert(err.message);
				});
		} catch (error: any) {
			console.error(error);
			alert(error.message ?? error.toString());
		}
	};

	useEffect(() => {
		if (resendOTPTimeout > 0) {
			const timer = setTimeout(() => {
				setResendOTPTimeout(resendOTPTimeout - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [resendOTPTimeout]);

	return (
		<main className={classNames("")}>
			<section
				className={classNames("-graphic")}
				style={{
					backgroundImage: `url(${rumiDarwaza.src})`,
				}}
			>
				<div className={classNames("-graphic__text")}>
					Travelling
					<br />
					It leaves you speechless
					<br />
					And turns you into a storyteller
					<br />
				</div>
			</section>
			<section className={classNames("-content")}>
				<div className={classNames("-content-head")}>
					<h1 className={classNames("-content-head__icon")}>
						<Avatar
							src={primaryLogo4.src}
							alt="Avatar"
							onClick={() => router.push("/")}
						/>
					</h1>
					<h1 className={classNames("-content-head__title")}>
						Create an Account
					</h1>
					<h3 className={classNames("-content-head__subtitle")}>
						Let&apos;s get you started
					</h3>
				</div>
				<form
					className={classNames("-content-form")}
					onSubmit={handleSubmit}
				>
					<Input
						type="text"
						name="name"
						placeholder="Name"
						value={inputCred.name}
						onChange={handleInputChange}
						error={
							inputCred.name.length > 0 &&
							!regex.name.test(inputCred.name)
						}
						errorMessage="Name must be atleast 3 characters"
					/>
					<Input
						type="email"
						name="email"
						placeholder="Email"
						value={inputCred.email}
						onChange={handleInputChange}
						disabled={isOtpValid}
						error={
							inputCred.email.length > 0 &&
							!regex.email.test(inputCred.email)
						}
						errorMessage="Email is not valid"
					/>
					{!isOtpValid && regex.email.test(inputCred.email) ? (
						<div className={classNames("-content-form-group")}>
							{showOTPBox ? (
								<Button
									variant="outlined"
									type="button"
									disabled={
										!inputCred.email.length ||
										!regex.email.test(inputCred.email) ||
										resendOTPTimeout > 0
									}
									onClick={requestOTP}
								>
									{resendOTPTimeout > 0
										? `Retry in ${resendOTPTimeout} seconds`
										: "Resend OTP"}
								</Button>
							) : null}
							<Button
								variant="filled"
								type="button"
								disabled={
									showOTPBox ||
									!inputCred.email.length ||
									!regex.email.test(inputCred.email)
								}
								onClick={requestOTP}
							>
								Request OTP
							</Button>
						</div>
					) : null}
					{isOtpValid ? (
						<>
							<div className={classNames("-content-form-group")}>
								<Input
									type="password"
									name="password"
									placeholder="Password"
									value={inputCred.password}
									onChange={handleInputChange}
									error={
										inputCred.password.length > 0 &&
										!regex.password.test(inputCred.password)
									}
									errorMessage="Password must be atleast 8 characters and must contain atleast one uppercase, one lowercase, one number and one special character"
								/>
								<Input
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
									value={inputCred.confirmPassword}
									onChange={handleInputChange}
									error={
										typeof inputCred.confirmPassword ===
											"string" &&
										inputCred.confirmPassword.length > 0 &&
										inputCred.confirmPassword !==
											inputCred.password
									}
									errorMessage="Passwords do not match"
								/>
							</div>
							<Button type="submit" variant="outlined">
								Create Account
							</Button>
						</>
					) : null}
				</form>
				{showOTPBox && !isOtpValid ? (
					<form
						className={classNames("-content-form")}
						style={{
							justifyContent: "space-between",
							flexFlow: "row nowrap",
							gap: "0",
						}}
					>
						{otp.map((data, index) => (
							<Input
								key={index}
								type="text"
								name={`otp${index}`}
								maxLength={1}
								autoFocus={index === 0}
								value={data}
								style={{
									width: "3rem",
								}}
								styles={{
									box: { alignItems: "center" },
								}}
								onKeyUp={(e: any) => {
									if (e.target.value.length === 1) {
										if (
											e.target.value >= 0 &&
											e.target.value <= 9
										) {
											if (e.target.name === "otp5") {
												e.target.blur();
											} else {
												document
													.getElementsByName(
														"otp" +
															(+e.target.name[
																e.target.name
																	.length - 1
															] +
																1)
													)[0]
													.focus();
											}
										} else {
											e.target.value = "";
										}
									}
								}}
								onChange={(e) => {
									if (
										e.target.value === "" ||
										regex.otp.test(e.target.value)
									) {
										const otpArray = [...otp];
										otpArray[index] = e.target.value;
										setOtp(otpArray);
										if (
											otpArray.join("").length === 6 &&
											otpArray.every((n) => !isNaN(n))
										) {
											verifyOTP(otpArray);
										} else {
											setIsOtpValid(false);
										}
									}
								}}
								onFocus={(e) => e.target.select()}
							/>
						))}
					</form>
				) : null}
				<div className={classNames("-content-footer")}>
					<p className={classNames("-content-footer__text")}>
						Already have an account?{" "}
						<Link href="/login">Login</Link>
					</p>
				</div>
			</section>
		</main>
	);
};

export default SignInPage;
