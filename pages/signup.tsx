import styles from "@/styles/Auth.module.scss";
import React, { useState } from "react";
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputCred((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
						error={
							inputCred.email.length > 0 &&
							!regex.email.test(inputCred.email)
						}
						errorMessage="Email is not valid"
					/>
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
							typeof inputCred.confirmPassword === "string" &&
							inputCred.confirmPassword.length > 0 &&
							inputCred.confirmPassword !== inputCred.password
						}
						errorMessage="Passwords do not match"
					/>
					<Button type="submit" variant="outlined">
						Create Account
					</Button>
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
