/* eslint-disable @next/next/no-img-element */
import { randomId, stylesConfig } from "@/utils/functions";
import styles from "./Table.module.scss";
import { ITableHeadField } from "./types";

export const classNames = stylesConfig(styles);

const sortData = (
	data: any[],
	field: ITableHeadField,
	direction: "asc" | "desc"
) => {
	const comparator = field.comparator;
	if (typeof comparator === "function") {
		return [...data]?.sort((a, b) => {
			const aValue = a[field.key];
			const bValue = b[field.key];
			return direction === "asc"
				? comparator(aValue, bValue)
				: comparator(bValue, aValue);
		});
	}
	return data;
};

const formatCell = (value: any, formatter: any, fallback?: any) => {
	if (typeof formatter === "function") {
		return typeof fallback !== "undefined"
			? value
				? formatter(value)
				: typeof fallback === "function"
				? fallback(value)
				: fallback
			: formatter(value);
	}
	switch (formatter) {
		case "text":
			return typeof fallback !== "undefined"
				? value
					? value
					: typeof fallback === "function"
					? fallback(value)
					: fallback
				: value;
		case "skills":
			if (value)
				return (
					<div className={classNames("table-cell--skills")}>
						{value?.map((s: any, index: number) => (
							<div
								className={classNames("table-cell--skill")}
								key={[
									s?.toString(),
									s?.name,
									s?.logo,
									index,
									Date.now(),
									randomId(),
								].join("-")}
							>
								{s?.logo ? (
									<img
										src={s?.logo}
										alt={s?.name}
										className={classNames(
											"table-cell--skill-logo"
										)}
									/>
								) : null}
								{s?.name}
							</div>
						))}
					</div>
				);
			else if (typeof fallback !== "undefined")
				return (
					<div className={classNames("table-cell--skills")}>
						{typeof fallback === "function"
							? fallback(value)
							: fallback}
					</div>
				);
			return "No skills";
		case "score":
			if (typeof value === "number" || !isNaN(Number(value)))
				return (
					<div className={classNames("table-cell--score")}>
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<img
									src={`/assets/vectors/block-${
										value - (index + 1) * 20 >= 0
											? "filled"
											: value - (index + 1) * 20 >= -10 &&
											  value - (index + 1) * 20 < 0
											? "half-filled"
											: "blur"
									}.svg`}
									alt="block"
									key={[
										"Score",
										index,
										Date.now(),
										randomId(),
									].join("-")}
								/>
							))}
					</div>
				);
			else if (typeof fallback !== "undefined")
				typeof fallback === "function" ? fallback(value) : fallback;
			return value ? value : "Not Rated";
		case "number":
			if (typeof value === "number" || !isNaN(Number(value)))
				return typeof fallback !== "undefined"
					? value
						? value
						: typeof fallback === "function"
						? fallback(value)
						: fallback
					: value;
			return typeof fallback !== "undefined"
				? typeof fallback === "function"
					? fallback(value)
					: fallback
				: value;
		case "date":
			if (value) {
				const date = new Date(value);
				return date.toLocaleDateString();
			}
			return typeof fallback !== "undefined"
				? value
					? value
					: typeof fallback === "function"
					? fallback(value)
					: fallback
				: value;
		case "time":
			if (value) {
				const date = new Date(value);
				return date.toLocaleTimeString();
			}
			return typeof fallback !== "undefined"
				? value
					? value
					: typeof fallback === "function"
					? fallback(value)
					: fallback
				: value;
		default:
			return typeof fallback !== "undefined"
				? value
					? value
					: typeof fallback === "function"
					? fallback(value)
					: fallback
				: value;
	}
};

export { sortData, formatCell };
