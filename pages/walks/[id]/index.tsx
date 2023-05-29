import { IWalk } from "@/types/Walk";
import { fetchWalkById } from "@/utils/api/walks";
import React from "react";
import styles from "@/styles/walks/Walk.module.scss";
import { openLink, stylesConfig } from "@/utils/functions";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Button from "@/library/Button";
import { ArrowLeft, MapPin } from "react-feather";
import { useRouter } from "next/router";
import useAuth from "@/hooks/auth";
const classes = stylesConfig(styles, "walk");

const WalkDetailsPage: React.FC<{ walk: IWalk; found: boolean }> = (props) => {
	const router = useRouter();
	const authState = useAuth();

	if (!props.found)
		return (
			<div className={classes("-not-found")}>
				<h2 className={classes("-not-found__title")}>Error 404</h2>
				<h4 className={classes("-not-found__subtitle")}>
					Walk Not Found
				</h4>
				<Button
					onClick={() => router.push("/walks")}
					icon={<ArrowLeft />}
					iconPosition="left"
				>
					Go Back to Walks
				</Button>
			</div>
		);
	const { title, content, excerpt, location } = props.walk;
	return (
		<main className={classes("")}>
			<div className={classes("-header")}>
				<h1 className={classes("-header__title")}>{title}</h1>
				<div className={classes("-header__actions")}>
					<Button
						onClick={() => {
							if (authState.loggedIn)
								router.push(
									`/walks/${router.query.id}/enquiry`
								);
							else
								router.push({
									pathname: "/login",
									query: {
										redirect: `/walks/${router.query.id}/enquiry`,
									},
								});
						}}
						variant="outlined"
					>
						Raise an Enquiry
					</Button>
					<Button onClick={() => openLink("https://razorpay.com")}>
						Book Now
					</Button>
				</div>
			</div>
			<div className={classes("-excerpt")}>
				<p className={classes("-excerpt__content")}>
					{excerpt}
					{excerpt[excerpt.length - 1] !== "." ? "..." : null}
				</p>
			</div>
			<div className={classes("-details")}>
				{location ? (
					<div className={classes("-details__location")}>
						<MapPin />
						<span>{location}</span>
					</div>
				) : null}
			</div>
			<div className={classes("-content")}>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					className={classes("-content__markdown")}
					linkTarget={"_blank"}
				>
					{content}
				</ReactMarkdown>
			</div>
		</main>
	);
};

export default WalkDetailsPage;

export const getServerSideProps = async (context: any) => {
	const { id } = context.query;
	try {
		const res = await fetchWalkById(id);
		return {
			props: {
				walk: JSON.parse(JSON.stringify(res.data)),
				found: true,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				walk: null,
				found: false,
			},
		};
	}
};
