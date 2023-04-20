import styles from "@/styles/Auth.module.scss";
import React, { useContext, useState } from "react";
import { stylesConfig } from "@/utils/functions";
import { rumiDarwaza } from "@/assets/images";
import Avatar from "@/components/Avatar/Avatar";
import { favicon } from "@/assets/vectors";
import Input from "@/library/Input";
import Button from "@/library/Button";
import Link from "next/link";
import regex from "@/constants/regex";
import { loginValidator } from "@/validations/auth";
import { LoginValues } from "@/interfaces/auth";
import { fetchAuthenticatedUser, loginUser } from "@/utils/api/auth";
import { useRouter } from "next/router";
import GlobalContext from "@/context/GlobalContext";

const classNames = stylesConfig(styles);

const SignInPage: React.FC = () => {
	const router = useRouter();
	const { setUser } = useContext(GlobalContext);

	const [inputCred, setInputCred] = useState<LoginValues>({
		email: "",
		password: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputCred((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await loginValidator(inputCred).catch((err) => {
				throw err.map((err: any) => err.message).join(", ");
			});
			const login = await loginUser(inputCred);
			localStorage.setItem("token", login.token);
			const verifiedUser: any = await fetchAuthenticatedUser();
			setUser(verifiedUser.user);
			console.log(verifiedUser);
			router.push("/");
		} catch (error: any) {
			console.error(error);
			alert(error.message);
		}
	};

	return (
		<main className={classNames("auth")}>
			<section
				className={classNames("auth-graphic")}
				style={{
					backgroundImage: `url(${rumiDarwaza.src})`,
				}}
			>
				<div className={classNames("auth-graphic__text")}>
					Content for City tales comes here Atleast 3 lines. Content
					for City tales comes here
				</div>
			</section>
			<section className={classNames("auth-content")}>
				<div className={classNames("auth-content-head")}>
					<h1 className={classNames("auth-content-head__icon")}>
						<Avatar src={favicon.src} alt="Avatar" />
					</h1>
					<h1 className={classNames("auth-content-head__title")}>
						Login
					</h1>
					<h3 className={classNames("auth-content-head__subtitle")}>
						Welcome back again!
					</h3>
				</div>
				<form
					className={classNames("auth-content-form")}
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
					<Button type="submit" variant="outlined">
						Login
					</Button>
				</form>
				<div className={classNames("auth-content-footer")}>
					<p className={classNames("auth-content-footer__text")}>
						Dont have an account? <Link href="/signup">Signup</Link>
					</p>
				</div>
			</section>
		</main>
	);
};

export default SignInPage;
