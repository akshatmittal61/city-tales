import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Layout from "@/layouts";
import useContextData from "@/context/useContext";
import GlobalContext from "@/context/GlobalContext";
import useLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useState } from "react";
import Overlay from "@/layouts/Overlay";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }: AppProps) {
	const context = useContextData();
	if (typeof window !== "undefined") AOS.init();
	const [showOverlay, setShowOverlay] = useState(true);

	useLayoutEffect(() => {
		const timer = setTimeout(() => {
			setShowOverlay(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<GlobalContext.Provider value={context}>
			{showOverlay && <Overlay />}
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalContext.Provider>
	);
}
