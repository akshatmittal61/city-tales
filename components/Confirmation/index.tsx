import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import Button from "@/library/Button";
import React, { useState } from "react";
import Popup from "@/library/Popup";

interface ConfirmationModalProps {
	title: string;
	body: any;
	onConfirm: () => void;
	onCancel: () => void;
}

const classes = stylesConfig(styles, "confirmation-modal");

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	title,
	body,
	onConfirm,
	onCancel,
}) => {
	return (
		<Popup title={title} onClose={onCancel} width="550px" height="250px">
			<div className={classes("-body")}>{body}</div>
			<div className={classes("-footer")}>
				<Button variant="outlined" onClick={onCancel} size="small">
					Cancel
				</Button>
				<Button variant="filled" onClick={onConfirm} size="small">
					Confirm
				</Button>
			</div>
		</Popup>
	);
};

export default ConfirmationModal;

const useConfirmationModal = (
	title: string,
	body: any,
	onConfirm: any,
	onCancel: any
) => {
	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => setShowPopup(true);
	const closePopup = () => setShowPopup(false);

	const Modal = (
		<ConfirmationModal
			title={title}
			body={body}
			onConfirm={() => {
				onConfirm();
				closePopup();
			}}
			onCancel={() => {
				onCancel();
				closePopup();
			}}
		/>
	);
	return { openPopup, closePopup, showPopup, Modal };
};

export { useConfirmationModal };
