import React from "react";
import styles from "./Input.module.scss";
import { stylesConfig } from "@/utils/functions";

const classNames = stylesConfig(styles);

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	errorMessage?: string;
	className?: string;
	label?: string;
	styles?: {
		box?: React.CSSProperties;
		input?: React.CSSProperties;
	};
	icon?: any;
}

export const Input: React.FC<IInputProps> = ({
	error,
	errorMessage,
	className,
	styles,
	icon,
	...props
}) => {
	return (
		<div className={classNames("input__container")} style={styles?.box}>
			{props.label ? (
				<label
					className={classNames("input__label")}
					htmlFor={props.id}
				>
					{props.label}
				</label>
			) : null}
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
				style={{
					...styles?.input,
					...props.style,
				}}
				{...props}
			/>
			{icon ? (
				<div className={classNames("input__icon")}>{icon}</div>
			) : null}
		</div>
	);
};

export default Input;
