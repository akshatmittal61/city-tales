import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Layout from "@/layouts";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
