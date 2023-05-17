import React from "react";

export interface ExplorationItem {
	image: string;
	title: string;
	description: string;
	link: string;
	style?: React.CSSProperties;
}

export interface WalkItem {
	id: string;
	title: string;
	description: string;
	image: string;
	slotsLeft?: number;
}
