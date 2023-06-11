import React from "react";
import Placeholder from "@/components/Placeholder";
import socials from "@/constants/socials";
import { openLink } from "@/utils/functions";

const HomePage: React.FC = () => {
	return (
		<Placeholder
			title="Site Under Maintenance"
			button={{
				text: "Explore our Heritage",
				onClick: () =>
					openLink(
						socials.find((s) => s.name === "Instagram")
							?.url as string
					),
			}}
		/>
	);
};

export default HomePage;
