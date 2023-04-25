import React, { useRef, useState } from "react";
import styles from "./Filter.module.scss";
import { stylesConfig } from "@/utils/functions";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { useOnClickOutside } from "@/hooks/mouse-events";

const classes = stylesConfig(styles);

export interface Filter {
	id: string;
	name: string;
	value: string;
	selected: boolean;
}

export interface Props {
	filters: Filter[];
	onChange: (_: Filter[]) => void;
	showSelected?: boolean;
	styles?: {
		option: React.CSSProperties;
		selected: React.CSSProperties;
		box: React.CSSProperties;
	};
}

const Filters: React.FC<Props> = ({
	filters,
	onChange,
	styles,
	showSelected,
}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const boxRef = useRef<any>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(dropdownRef, () => setShowDropdown(false));

	const handleFilterChange = (filter: Filter) => {
		const newFilters = filters.map((f) => {
			if (f.id === filter.id) {
				return {
					...f,
					selected: !f.selected,
				};
			}
			return f;
		});
		onChange(newFilters);
	};

	return (
		<div className={classes("filters")}>
			<div
				className={classes("filters-box")}
				onClick={() => {
					if (!showDropdown) setShowDropdown(true);
				}}
				ref={boxRef}
				style={styles?.box}
			>
				<span className={classes("filters-box__title")}>Filters</span>
				<IoIosArrowDown className={classes("filters-box__icon")} />
			</div>
			{showDropdown ? (
				<div
					className={classes("filters-dropdown")}
					style={{
						...styles?.box,
						width: boxRef.current?.offsetWidth,
						left: boxRef.current?.offsetLeft,
						top:
							boxRef.current?.offsetTop +
							boxRef.current?.offsetHeight +
							2,
					}}
					ref={dropdownRef}
				>
					{filters.map((filter: Filter, index: number) => (
						<div
							className={classes("filters-dropdown__option")}
							key={filter.id + index}
							style={
								filter.selected
									? styles?.selected
									: styles?.option
							}
							onClick={() => handleFilterChange(filter)}
						>
							<span
								className={classes(
									"filters-dropdown__option__icon"
								)}
							>
								{filter.selected ? (
									<svg
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4.5 8.5L1.5 5.5L0.5 6.5L4.5 10.5L11.5 3.5L10.5 2.5L4.5 8.5Z"
											fill="#00A8E8"
										/>
									</svg>
								) : null}
							</span>
							<span>{filter.name}</span>
						</div>
					))}
				</div>
			) : null}
			{showSelected && filters.filter((f) => f.selected).length > 0 ? (
				<>
					{filters
						.filter((f) => f.selected)
						.map((filter: Filter, index: number) => (
							<div
								className={classes("filters-list__item")}
								key={filter.id + index}
								style={styles?.selected}
							>
								<span>{filter.name}</span>
								<IoMdClose
									onClick={() => handleFilterChange(filter)}
								/>
							</div>
						))}
				</>
			) : null}
		</div>
	);
};

export default Filters;
