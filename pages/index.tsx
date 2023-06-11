import React from "react";
import Placeholder from "@/components/Placeholder";
import { openLink } from "@/utils/functions";
import socials from "@/constants/socials";

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
