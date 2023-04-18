import React from "react";
import styles from "./Input.module.scss";
import { stylesConfig } from "@/utils/functions";

const classNames = stylesConfig(styles);

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	className?: string;
}

export const Input: React.FC<IInputProps> = ({
	error,
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
				e.currentTarget.setCustomValidity("Please enter a valid name");
			}}
			{...props}
		/>
	);
};

export default Input;
