import React from "react";
import { useRouter } from "next/router";
import Placeholder from "@/components/Placeholder";

const ComingSoonPage: React.FC = () => {
	const router = useRouter();
	return (
		<Placeholder
			title="Coming Soon"
			button={{ text: "Explore More", onClick: () => router.push("/") }}
		/>
	);
};

export default ComingSoonPage;
