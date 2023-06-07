import React from "react";
import styles from "@/styles/ComingSoon.module.scss";
import { stylesConfig } from "@/utils/functions";
import { comingSoon } from "@/assets/images";
import Button from "@/library/Button";
import { useRouter } from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai";

const classes = stylesConfig(styles, "coming-soon");

const EmptyPage: React.FC = () => {
	const router = useRouter();
	return (
		<main
			className={classes("")}
			style={{
				backgroundImage: `url(${comingSoon.src})`,
			}}
		>
			<span>Oops! Page not found</span>
			<Button
				variant="filled"
				size="large"
				onClick={() => router.push("/")}
				icon={<AiOutlineArrowRight />}
				iconPosition="right"
			>
				Explore More
			</Button>
		</main>
	);
};

export default EmptyPage;
