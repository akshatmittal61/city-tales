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
import { toast } from "react-toastify";
import { getRegistraionOtp, verifyRegistrationOtp } from "@/utils/api/auth";
import useAuth from "@/hooks/auth";
import { BiHide, BiShow } from "react-icons/bi";

const classNames = stylesConfig(styles, "auth");

const SignInPage: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch<any>();
	const authState = useAuth();
	const [showPassword, setShowPassword] = useState(false);

	const [inputCred, setInputCred] = useState<RegisterValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		location: "",
	});
	const [otp, setOtp] = useState(Array(6).fill(""));
	const [showOTPBox, setShowOTPBox] = useState(false);
	const [isOtpValid, setIsOtpValid] = useState(false);
	const [resendOTPTimeout, setResendOTPTimeout] = useState(60);

	const [requestingOtp, setRequestingOtp] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const [verifyingOtp, setVerifyingOtp] = useState(false);
	const [registering, setRegistering] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputCred((prev) => ({ ...prev, [name]: value }));
	};

	const requestOTP = async (e?: any) => {
		e?.preventDefault();
		try {
			setRequestingOtp(true);
			await getRegistraionOtp(inputCred.email);
			toast.success("OTP sent to your email. It will expire in 1 minute");
			setShowOTPBox(true);
			setResendOTPTimeout(60);
			setOtpSent(true);
		} catch (error: any) {
			console.error(error);
			toast.error(
				error.message ?? error.toString() ?? "Something went wrong"
			);
		} finally {
			setRequestingOtp(false);
		}
	};

	const verifyOTP = async (otp: number[] | string[]) => {
		if (
			otp.join("").length !== 6 ||
			(otp.join("").length === 6 && otp.some((n: any) => isNaN(n)))
		) {
			toast.error("Invalid OTP entered");
			requestOTP();
			return;
		}
		try {
			setVerifyingOtp(true);
			await verifyRegistrationOtp(inputCred.email, otp.join(""));
			toast.success("OTP verified successfully");
			setIsOtpValid(true);
		} catch (error: any) {
			console.error(error);
			toast.error(
				error.message ?? error.toString() ?? "Something went wrong"
			);
		} finally {
			setVerifyingOtp(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isOtpValid) {
			toast.error("OTP is not verified");
			verifyOTP(otp);
			return;
		}
		try {
			await registerValidator(inputCred).catch((err) => {
				throw err.map((err: any) => err.message).join(", ");
			});
			setRegistering(true);
			await dispatch(registerUser(inputCred))
				.then(unwrapResult)
				.then(() => {
					router.push({
						pathname: "/login",
						query: router.query,
					});
				})
				.catch((err: any) => {
					console.error(err);
					toast.error(err.message);
				});
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? error.toString());
		} finally {
			setRegistering(false);
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

	useEffect(() => {
		if (!authState?.loading && authState?.loggedIn)
			router.push(router.query.redirect?.toString() ?? "/");
	}, [authState, router]);

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

					{showOTPBox && !isOtpValid ? (
						<div
							className={classNames("-content-form-group")}
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
									autoFocus={index === 0}
									value={data}
									style={{
										width: "3rem",
										textAlign: "center",
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
																	e.target
																		.name
																		.length -
																		1
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
											e.target.value.length === 6 &&
											index === 0 &&
											e.target.value
												.split("")
												.every(
													(val: any) =>
														val >= 0 && val <= 9
												)
										) {
											const otpArray =
												e.target.value.split("");
											setOtp(otpArray);
											document
												.getElementsByName("otp5")[0]
												.focus();
											return;
										} else if (
											e.target.value === "" ||
											regex.otp.test(e.target.value)
										) {
											const otpArray = [...otp];
											if (e.target.value === "")
												otpArray[index] = "";
											else if (
												+e.target.value >= 0 &&
												+e.target.value <= 9
											)
												otpArray[index] =
													e.target.value;
											setOtp(otpArray);
										}
									}}
									onFocus={(e) => e.target.select()}
								/>
							))}
						</div>
					) : null}
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
									loading={requestingOtp}
								>
									{resendOTPTimeout > 0
										? `Retry in ${resendOTPTimeout} seconds`
										: "Resend OTP"}
								</Button>
							) : null}
							{otpSent ? (
								<Button
									variant="filled"
									type="button"
									disabled={
										!inputCred.email.length ||
										!regex.email.test(inputCred.email) ||
										requestingOtp ||
										!regex.otp.test(otp.join(""))
									}
									onClick={() => verifyOTP(otp)}
									loading={verifyingOtp}
								>
									Verify OTP
								</Button>
							) : (
								<Button
									variant="filled"
									type="button"
									disabled={
										showOTPBox ||
										!inputCred.email.length ||
										!regex.email.test(inputCred.email) ||
										requestingOtp
									}
									onClick={requestOTP}
									loading={requestingOtp}
								>
									Request OTP
								</Button>
							)}
						</div>
					) : null}
					{isOtpValid ? (
						<>
							<div className={classNames("-content-form-group")}>
								<Input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Password"
									value={inputCred.password}
									required
									onChange={handleInputChange}
									error={
										inputCred.password.length > 0 &&
										!regex.password.test(inputCred.password)
									}
									errorMessage="Password must be atleast 8 characters and must contain atleast one uppercase, one lowercase, one number and one special character"
									icon={
										showPassword ? (
											<BiHide
												onClick={() =>
													setShowPassword(false)
												}
											/>
										) : (
											<BiShow
												onClick={() =>
													setShowPassword(true)
												}
											/>
										)
									}
								/>
								<Input
									type={showPassword ? "text" : "password"}
									name="confirmPassword"
									placeholder="Confirm Password"
									value={inputCred.confirmPassword}
									required
									onChange={handleInputChange}
									error={
										typeof inputCred.confirmPassword ===
											"string" &&
										inputCred.confirmPassword.length > 0 &&
										inputCred.confirmPassword !==
											inputCred.password
									}
									errorMessage="Passwords do not match"
									icon={
										showPassword ? (
											<BiHide
												onClick={() =>
													setShowPassword(false)
												}
											/>
										) : (
											<BiShow
												onClick={() =>
													setShowPassword(true)
												}
											/>
										)
									}
								/>
							</div>
							<div className={classNames("-content-form-group")}>
								<Input
									type="tel"
									name="phone"
									placeholder="Phone Number"
									error={
										inputCred.phone &&
										inputCred.phone?.length > 0 &&
										!regex.phone.test(inputCred.phone ?? "")
											? true
											: false
									}
									errorMessage="Phone number is not valid"
									value={inputCred.phone}
									onChange={handleInputChange}
								/>
								<Input
									type="text"
									name="location"
									placeholder="City of Residence"
									error={
										inputCred.phone &&
										inputCred.phone?.length > 0 &&
										!regex.location.test(
											inputCred.location ?? ""
										)
											? true
											: false
									}
									errorMessage="Location should be between 2 and 50 characters"
									value={inputCred.location}
									onChange={handleInputChange}
								/>
							</div>
							<Button
								type="submit"
								variant="outlined"
								loading={registering}
							>
								Create Account
							</Button>
						</>
					) : null}
				</form>
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
