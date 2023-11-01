import React from "react";
import { useRouter } from "next/router";
import Placeholder from "@/components/Placeholder";

const ErrorPage: React.FC = () => {
	const router = useRouter();
	return (
		<Placeholder
			title="Oops! Something went wrong"
			button={{
				text: "Let's get you home",
				onClick: () => router.push("/"),
			}}
		/>
	);
};

export default ErrorPage;
