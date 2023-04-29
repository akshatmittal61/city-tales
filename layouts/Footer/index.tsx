import React from "react";
import styles from "./Footer.module.scss";
import { stylesConfig } from "@/utils/functions";
import Image from "next/image";
import { favicon } from "@/assets/vectors";
import socials from "@/constants/socials";

const Footer: React.FC = () => {
	const classNames = stylesConfig(styles, "footer");
	return (
		<footer className={classNames("")}>
			<div className={classNames("-container")}>
				<div className={classNames("-logo")}>
					<div className={classNames("-logo-icon")}>
						<Image
							src={favicon}
							alt="Favicon"
							width={48}
							height={48}
						/>
					</div>
					<span className={classNames("-logo-text")}>City Tales</span>
				</div>
				<div className={classNames("-socials")}>
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
