/* eslint-disable no-undef */
import HomePage from "@/pages";
import { useRouter } from "next/router";
import { render } from "@testing-library/react";
import {
	sampleExplorations,
	sampleHighlights,
	sampleReviews,
	sampleWalks,
} from "@/constants/landing";

const mockPush = jest.fn();

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockImplementation(() => ({
	pathname: "/",
	push: mockPush,
}));

// To check if Home Page has text length greater than 0
test("Home Page has text content", () => {
	const { container } = render(
		<HomePage
			highlights={sampleHighlights}
			walks={sampleWalks}
			explorations={sampleExplorations}
			reviews={sampleReviews.map((review) => ({
				...review,
				date: review.date.toString(),
			}))}
		/>
	);
	expect(container.textContent).toBeTruthy();
});
