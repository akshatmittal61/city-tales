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
import { loginValidator } from "@/validations/auth";
import { LoginValues } from "@/types/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getAuthenticatedUser, loginUser } from "@/global/helpers/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const classNames = stylesConfig(styles, "auth");

const SignInPage: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch<any>();

	const [inputCred, setInputCred] = useState<LoginValues>({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputCred((prev) => ({ ...prev, [name]: value }));
	};

	const setGlobalUser = async () => {
		try {
			await dispatch(getAuthenticatedUser());
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await loginValidator(inputCred).catch((err) => {
				throw err.map((err: any) => err.message).join(", ");
			});
			await dispatch(loginUser(inputCred))
				.then(unwrapResult)
				.then(() => {
					setGlobalUser();
					if (router.query.redirect)
						router.push(router.query.redirect as string);
					else router.push("/");
				})
				.catch((err: any) => {
					console.error(err);
					toast.error(err.message);
				});
		} catch (error: any) {
			console.error(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
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
						Login
					</h1>
					<h3 className={classNames("-content-head__subtitle")}>
						Welcome back again!
					</h3>
				</div>
				<form
					className={classNames("-content-form")}
					onSubmit={handleSubmit}
				>
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
					/>
					<Button type="submit" variant="outlined" loading={loading}>
						Login
					</Button>
				</form>
				<div className={classNames("-content-footer")}>
					<p className={classNames("-content-footer__text")}>
						Dont have an account?{" "}
						<Link
							href={{
								pathname: "/signup",
								query: router.query,
							}}
						>
							Signup
						</Link>
					</p>
					<p className={classNames("-content-footer__text")}>
						Forgot Password?{" "}
						<Link
							href={{
								pathname: "/reset-password",
								query: router.query,
							}}
						>
							Reset Password
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
};

export default SignInPage;
