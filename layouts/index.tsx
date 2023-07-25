import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Seo from "./Seo";
import { frontendBaseUrl } from "@/constants/variables";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout: React.FC<any> = ({ children }) => {
	const router = useRouter();
	const [showNav, setShowNav] = useState(false);
	const [showFooter, setShowFooter] = useState(false);

	useEffect(() => {
		if (
			router.pathname === "/login" ||
			router.pathname === "/signup" ||
			router.pathname === "/reset-password"
		) {
			setShowNav(false);
			setShowFooter(false);
		} else {
			setShowNav(true);
			setShowFooter(true);
		}
	}, [router.pathname]);

	return (
		<>
			<Seo
				title="City Tales"
				description="Experience the untold stories of vibrant cities with City Tales - where every journey is a tale waiting to be told."
				image="/images/og-image.png"
				icons={["icon", "shortcut icon", "apple-touch-icon"].map(
					(item) => {
						return {
							rel: item,
							href: "/favicon.ico",
							type: "icon/ico",
						};
					}
				)}
				twitter={{
					card: "summary_large_image",
					site: "@citytales",
					author: "@akshatmittal61",
					title: "City Tales",
					description:
						"Experience the untold stories of vibrant cities with City Tales - where every journey is a tale waiting to be told.",
					image: "/images/og-image.png",
					url: frontendBaseUrl,
				}}
				og={{
					title: "City Tales",
					description:
						"Experience the untold stories of vibrant cities with City Tales - where every journey is a tale waiting to be told.",
					images: [
						{
							url: "/images/og-image.png",
							secureUrl: "/images/og-image.png",
							type: "image/png",
							width: 1200,
							height: 630,
							alt: "City Tales",
						},
					],
					url: frontendBaseUrl,
					type: "website",
					siteName: "City Tales",
				}}
			/>
			{showNav ? <Navbar /> : null}
			{children}
			{showFooter ? <Footer /> : null}
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
};

export default Layout;
