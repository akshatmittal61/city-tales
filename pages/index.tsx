import React from "react";
import {
	ExplorationSection,
	HeroSection,
	WalksSection,
	ReviewsSection,
} from "@/components/Home";

const HomePage: React.FC = () => {
	return (
		<main className="home">
			<HeroSection />
			<ExplorationSection />
			<WalksSection />
			<ReviewsSection />
		</main>
	);
};

export default HomePage;
