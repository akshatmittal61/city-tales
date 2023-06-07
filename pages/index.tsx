import React from "react";
import {
	ExplorationSection,
	HeroSection,
	WalksSection,
	ReviewsSection,
} from "@/components/Home";
import { fetchApprovedReviews } from "@/utils/api/review";
import { fetchExplorationBlogs, fetchShowcaseBlogs } from "@/utils/api/blogs";
import { fetchPublishedWalks } from "@/utils/api/walks";
import { WALK } from "@/constants/enum";
import { Blog } from "@/types/Blog";
import { IReview } from "@/types/Review";
import { IWalk } from "@/types/Walk";

const HomePage: React.FC<{
	highlights: Blog[];
	explorations: Blog[];
	walks: IWalk[];
	reviews: IReview[];
}> = ({ highlights, reviews, walks, explorations }) => {
	console.log(highlights, explorations, walks, reviews);
	return (
		<main className="home">
			{highlights.length > 0 ? (
				<HeroSection highlights={highlights} />
			) : null}
			{explorations.length > 0 ? (
				<ExplorationSection explorations={explorations} />
			) : null}
			{walks.length > 0 ? <WalksSection walks={walks} /> : null}
			{reviews.length > 0 ? <ReviewsSection reviews={reviews} /> : null}
		</main>
	);
};

export default HomePage;

export const getServerSideProps = async () => {
	try {
		const reviews = await fetchApprovedReviews();
		const showcaseBlogs = await fetchShowcaseBlogs();
		const explorationsBlogs = await fetchExplorationBlogs();
		const walks = await fetchPublishedWalks();
		const walksToShow: any = [];
		const indexOfFirstUpcomingWalk = walks.data.findIndex(
			(w: any) => w.type === WALK.TYPE.UPCOMING
		);
		const indexOfFirstAvailableWalk = walks.data.findIndex(
			(w: any) => w.type === WALK.TYPE.AVAILABLE
		);
		if (indexOfFirstUpcomingWalk !== -1)
			walksToShow.push(walks.data[indexOfFirstUpcomingWalk]);
		if (indexOfFirstAvailableWalk !== -1)
			walksToShow.push(walks.data[indexOfFirstAvailableWalk]);
		return {
			props: {
				highlights: JSON.parse(JSON.stringify(showcaseBlogs.data)),
				explorations: JSON.parse(
					JSON.stringify(explorationsBlogs.data)
				),
				walks: JSON.parse(JSON.stringify(walksToShow)),
				reviews: JSON.parse(JSON.stringify(reviews.data)),
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				highlights: [],
				explorations: [],
				walks: [],
				reviews: [],
			},
		};
	}
};
