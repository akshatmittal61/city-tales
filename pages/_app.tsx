import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Layout from "@/layouts";
import { Provider } from "react-redux";
import store from "@/global/store";
import useLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useState } from "react";
import Overlay from "@/layouts/Overlay";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }: AppProps) {
	if (typeof window !== "undefined") AOS.init();
	const [showOverlay, setShowOverlay] = useState(true);

	useLayoutEffect(() => {
		const timer = setTimeout(() => {
			setShowOverlay(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Provider store={store}>
			{showOverlay && <Overlay />}
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
