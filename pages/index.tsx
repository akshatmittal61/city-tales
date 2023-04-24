import React from "react";
import {
	ExplorationSection,
	HeroSection,
	WalksSection,
} from "@/components/Home";

const HomePage: React.FC = () => {
	return (
		<main className="home">
			<HeroSection />
			<ExplorationSection />
			<WalksSection />
		</main>
	);
};

export default HomePage;
