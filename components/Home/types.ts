import React from "react";

export interface ExplorationItem {
	image: string;
	title: string;
	description: string;
	link: string;
	style?: React.CSSProperties;
}

export interface WalkProps {
	title: string;
	description: string;
	image: string;
	link: string;
	slotsLeft?: number;
}

export interface ReviewItem {
	user: string;
	content: string;
	rating: number;
	date: Date;
	image: string;
	title: string;
}
