import React from "react";

export interface ExplorationItem {
	image: string;
	title: string;
	description: string;
	link: string;
	style?: React.CSSProperties;
}
