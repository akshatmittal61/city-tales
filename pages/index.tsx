import React from "react";
import {
	ExplorationSection,
	HeroSection,
	WalksSection,
	ReviewsSection,
} from "@/components/Home";
import {
	sampleExplorations,
	sampleHighlights,
	sampleReviews,
	sampleWalks,
} from "@/constants/landing";

const HomePage: React.FC<{
	highlights: typeof sampleHighlights;
	reviews: typeof sampleReviews;
	walks: typeof sampleWalks;
	explorations: typeof sampleExplorations;
}> = ({ reviews, walks, explorations }) => {
	return (
		<main className="home">
			<HeroSection highlights={sampleHighlights} />
			<ExplorationSection explorations={explorations} />
			<WalksSection walks={walks} />
			<ReviewsSection reviews={reviews} />
		</main>
	);
};

export default HomePage;

export const getServerSideProps = async () => {
	return {
		props: {
			highlights: sampleHighlights,
			walks: sampleWalks,
			explorations: sampleExplorations,
			reviews: sampleReviews.map((review) => ({
				...review,
				date: review.date.toString(),
			})),
		},
	};
};
