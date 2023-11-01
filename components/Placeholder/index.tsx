import React from "react";
import { comingSoon } from "@/assets/images";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "@/library/Button";
import Seo from "@/layouts/Seo";

interface PlaceholderProps {
	title: string;
	// onClick?: () => void;
	button: {
		text: string;
		onClick: () => void;
	};
	className?: string;
	style?: React.CSSProperties;
}

const classes = stylesConfig(styles, "placeholder");

const Placeholder: React.FC<PlaceholderProps> = ({
	title,
	button: { text, onClick },
	className,
	style,
}) => {
	return (
		<main
			className={classes("") + ` ${className}`}
			style={{
				backgroundImage: `url(${comingSoon.src})`,
				...style,
			}}
		>
			<Seo title={title} />
			<span>{title}</span>
			<Button
				variant="filled"
				size="large"
				onClick={() => onClick && onClick()}
				icon={<AiOutlineArrowRight />}
				iconPosition="right"
			>
				{text}
			</Button>
		</main>
	);
};

export default Placeholder;
