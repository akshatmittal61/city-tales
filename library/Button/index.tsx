import { stylesConfig } from "@/utils/functions";
import styles from "./Button.module.scss";
import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	size?: "small" | "medium" | "large";
	variant?: "filled" | "outlined";
	loading?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
}

const classNames = stylesConfig(styles);

const BUTON_SIZES: { [key: string]: string } = {
	small: "btn--small",
	medium: "btn--medium",
	large: "btn--large",
};

const BUTTON_VARIANTS: { [key: string]: string } = {
	filled: "btn--filled",
	outlined: "btn--outlined",
};

export const Button: React.FC<IButtonProps> = ({
	children,
	className,
	size = "medium",
	variant = "filled",
	loading = false,
	icon,
	iconPosition = "left",
	...props
}) => {
	return (
		<button
			className={[
				classNames(
					"btn",
					BUTON_SIZES[size],
					BUTTON_VARIANTS[variant],
					{ "btn--loading": loading },
					{ "btn--disabled": props.disabled }
				),
				className,
			].join(" ")}
			disabled={props.disabled || loading}
			{...props}
		>
			{loading ? (
				<div className={classNames("btn__loader")}></div>
			) : (
				<>
					<div className={classNames("btn__icon", "btn__icon--left")}>
						{icon && iconPosition === "left" ? icon : null}
					</div>
					{children}
					<div
						className={classNames("btn__icon", "btn__icon--right")}
					>
						{icon && iconPosition === "right" ? icon : null}
					</div>
				</>
			)}
		</button>
	);
};

export default Button;
