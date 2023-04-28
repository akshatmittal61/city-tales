import React from "react";
import styles from "./Input.module.scss";
import { stylesConfig } from "@/utils/functions";

const classNames = stylesConfig(styles);

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	errorMessage?: string;
	className?: string;
}

export const Input: React.FC<IInputProps> = ({
	error,
	errorMessage,
	className,
	...props
}) => {
	return (
		<input
			className={
				classNames(
					"input",
					{ "input--error": error },
					{ "input--disabled": props.disabled }
				) + ` ${className}`
			}
			onInvalid={(e) => {
				e.currentTarget.setCustomValidity(errorMessage + "");
			}}
			onInput={(e) => {
				e.currentTarget.setCustomValidity("");
			}}
			title={error ? errorMessage : ""}
			{...props}
		/>
	);
};

export default Input;
