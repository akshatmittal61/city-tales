import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Layout from "@/layouts";
import useContextData from "@/context/useContext";
import GlobalContext from "@/context/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {
	const context = useContextData();
	return (
		<GlobalContext.Provider value={context}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalContext.Provider>
	);
}
