import React from "react";
import styles from "./Footer.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import { favicon } from "@/assets/vectors";
import socials from "@/constants/socials";

const Footer: React.FC = () => {
	const classNames = stylesConfig(styles);
	return (
		<footer className={classNames("footer")}>
			<div className={classNames("footer-container")}>
				<div className={classNames("footer-logo")}>
					<div className={classNames("footer-logo-icon")}>
						<Image
							src={favicon}
							alt="Favicon"
							width={48}
							height={48}
						/>
					</div>
					<span className={classNames("footer-logo-text")}>
						City Tales
					</span>
				</div>
				<div className={classNames("footer-socials")}>
					{socials.map((social, index) => (
						<a
							href={social.url}
							key={index}
							target="_blank"
							rel="noreferrer"
						>
							{social.icon}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
