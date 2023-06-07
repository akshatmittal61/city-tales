import { Blog } from "@/types/Blog";
import React from "react";

export interface ExplorationItem extends Blog {
	style?: React.CSSProperties;
}

export interface WalkItem {
	id: string;
	title: string;
	description: string;
	image: string;
	slotsLeft?: number;
}
