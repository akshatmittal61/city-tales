import React from "react";
import styles from "./Overlay.module.scss";
import { stylesConfig } from "@/utils/functions";
import { favicon } from "@/assets/vectors";
import Image from "next/image";

const classes = stylesConfig(styles);

const Overlay: React.FC = () => {
	return (
		<main className={classes("overlay")}>
			<div className={classes("overlay-image")}>
				<Image src={favicon} alt="favicon" width={256} height={256} />
			</div>
			<div className={classes("overlay-text")}>City Tales</div>
		</main>
	);
};

export default Overlay;
