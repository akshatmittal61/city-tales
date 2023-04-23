import React from "react";
import { ExplorationSection, HeroSection } from "@/components/Home";

const HomePage: React.FC = () => {
	return (
		<main className="home">
			<HeroSection />
			<ExplorationSection />
		</main>
	);
};

export default HomePage;
