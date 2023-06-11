import React from "react";
import { useRouter } from "next/router";
import Placeholder from "@/components/Placeholder";

const EmptyPage: React.FC = () => {
	const router = useRouter();
	return (
		<Placeholder
			title="Oops! Page Not Found"
			button={{
				text: "Explore More",
				onClick: () => router.push("/"),
			}}
		/>
	);
};

export default EmptyPage;
