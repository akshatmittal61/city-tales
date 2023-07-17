import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import React, { useRef } from "react";
import { useOnClickOutside } from "@/hooks/mouse-events";
import { IoIosClose } from "react-icons/io";

interface PopupProps {
	title: string;
	width?: string;
	height?: string;
	onClose: () => void;
	children: any;
	styles?: {
		container?: React.CSSProperties;
		header?: React.CSSProperties;
	};
}

const classes = stylesConfig(styles, "popup");

const Popup: React.FC<PopupProps> = ({
	title,
	width = "500px",
	height = "500px",
	onClose,
	children,
	styles = {
		container: {},
		header: {},
	},
}) => {
	const containerRef = useRef<any>(null);
	useOnClickOutside(containerRef, onClose);

	return (
		<div className={classes("")}>
			<div
				className={classes("-container")}
				style={{ width: width, height: height, ...styles.container }}
				data-aos="zoom-in"
				ref={containerRef}
			>
				<div className={classes("-header")} style={styles.header}>
					<h3>{title}</h3>
					<button onClick={onClose}>
						<IoIosClose />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Popup;
