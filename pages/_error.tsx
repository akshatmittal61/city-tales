import React from "react";
import { useRouter } from "next/router";
import Placeholder from "@/components/Placeholder";

const ServerError = () => {
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

ServerError.getInitialProps = ({ res, err }: { res: any; err: any }) => {
	const statusCode = res ? res?.statusCode : err ? err?.statusCode : 404;
	return { statusCode };
};

export default ServerError;
