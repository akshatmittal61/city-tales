import React from "react";
import styles from "./Avatar.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";

interface IAvatarProps {
	size?: "small" | "medium" | "large";
	src?: string;
	alt?: string;
	className?: string;
	onClick?: () => void;
}

const Avatar: React.FC<IAvatarProps> = ({
	size = "medium",
	src,
	alt,
	className,
	onClick,
}) => {
	const classNames = stylesConfig(styles);
	const getAvatarSize = () => {
		switch (size) {
			case "small":
				return 30;
			case "medium":
				return 50;
			case "large":
				return 100;
			default:
				return 50;
		}
	};

	return (
		<div
			className={classNames("avatar", className)}
			onClick={onClick}
			style={{
				width: getAvatarSize(),
				height: getAvatarSize(),
			}}
		>
			{src ? (
				<Image
					src={src}
					alt={alt + ""}
					width={getAvatarSize()}
					height={getAvatarSize()}
					className={classNames("avatar-image")}
				/>
			) : (
				<div className={classNames("avatar-placeholder")}>
					<span>{alt ? alt[0] : "A"}</span>
				</div>
			)}
		</div>
	);
};

export default Avatar;
