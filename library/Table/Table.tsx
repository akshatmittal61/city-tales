/* eslint-disable @next/next/no-img-element */
import { randomId, stylesConfig } from "@/utils/functions";
import React, { useState } from "react";
import TableCell from "./Cell";
import styles from "./Table.module.scss";
import TableRow from "./TableRow";
import { formatCell, sortData } from "./functions";
import { ITableHeadField } from "./types";

const classNames = stylesConfig(styles);

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
	fields: ITableHeadField[];
	data: any[];
	updateData?: any;
	className?: string;
	showHead?: boolean;
	showIndex?: boolean;
	selectable?: boolean;
	rowEvents?: {
		onClick?: (_: any) => void;
		onMouseEnter?: (_: any, __?: any) => void;
		onMouseLeave?: (_: any, __?: any) => void;
	};
	styles?: {
		table?: React.CSSProperties;
		tableHead?: React.CSSProperties;
		tableHeadRow?: React.CSSProperties;
		tableHeadCell?: React.CSSProperties;
		tableBody?: React.CSSProperties;
		tableBodyRow?: React.CSSProperties;
		tableBodyCell?: React.CSSProperties;
	};
}

const Table: React.FC<TableProps> = ({
	fields,
	data,
	updateData,
	className,
	showHead = true,
	showIndex = true,
	selectable = false,
	rowEvents = {},
	styles,
	...rest
}) => {
	const [sortBy, setSortBy] = useState<any>({
		field: null,
		direction: null,
	});

	return (
		<div className={classNames("table-container")}>
			<table
				className={classNames("table", className)}
				border={0}
				cellSpacing={0}
				style={styles?.table}
				{...rest}
			>
				{showHead ? (
					<thead
						className={classNames("table-head")}
						style={styles?.tableHead}
					>
						<tr
							className={classNames(
								"table-row",
								"table-head-row"
							)}
							style={styles?.tableHeadRow}
						>
							{selectable ? (
								<th
									key="select"
									className={classNames(
										"table-cell",
										"table-cell--select",
										"table-head-cell",
										"table-head-cell--select"
									)}
									style={styles?.tableHeadCell}
								>
									<button
										className={classNames("select")}
										onClick={() => {
											if (updateData && data) {
												const newData = data.map(
													(row) => ({
														...row,
														selected: data.every(
															(row) =>
																row.selected
														)
															? false
															: true,
													})
												);
												updateData(newData);
											}
										}}
										style={{
											backgroundImage: data.every(
												(row) => row?.selected
											)
												? "url(/vectors/tick-filled.svg)"
												: "unset",
										}}
									>
										<span
											className={classNames(
												"select-circle"
											)}
										>
											{data.every(
												(row) => row?.selected
											) ? (
												<img
													src="/vectors/tick-filled.svg"
													alt="check"
												/>
											) : null}
										</span>
									</button>
								</th>
							) : null}
							{showIndex ? (
								<th
									key="index"
									className={classNames(
										"table-cell",
										"table-head-cell"
									)}
								>
									#
								</th>
							) : null}
							{fields.map((field) =>
								field?.hidden ? null : (
									<th
										key={[
											field?.key,
											field?.label,
											Date.now(),
											randomId(),
										].join("-")}
										className={classNames(
											"table-cell",
											"table-head-cell",
											{
												"table-head-cell--sortable":
													field?.sortable,
											}
										)}
										style={{
											textAlign: field?.align ?? "left",
											...styles?.tableHeadCell,
											...field?.style,
										}}
									>
										{field?.label}
										{field?.sortable ? (
											<button
												className={classNames(
													"table-head-cell--sort"
												)}
												onClick={() => {
													if (
														updateData &&
														data &&
														field?.comparator
													) {
														const direction =
															sortBy?.field ===
																field?.key &&
															sortBy?.direction ===
																"asc"
																? "desc"
																: "asc";
														const newData =
															sortData(
																data,
																field,
																direction
															);
														updateData(newData);
														setSortBy({
															field: field?.key,
															direction,
														});
													}
												}}
											>
												<img
													src="/icons/arrow-up.svg"
													alt="arrow-up"
													style={{
														opacity:
															sortBy?.field ===
															field?.key
																? 1
																: 0.5,
														transform:
															sortBy?.field ===
																field?.key &&
															sortBy?.direction ===
																"asc"
																? "rotate(180deg)"
																: "rotate(0deg)",
													}}
												/>
											</button>
										) : null}
									</th>
								)
							)}
						</tr>
					</thead>
				) : null}
				<tbody className={classNames("table-body")}>
					{data.map((row, index) => (
						<TableRow
							key={row.id}
							row={row}
							rowEvents={rowEvents}
							className={classNames(
								"table-row",
								"table-body-row"
							)}
							style={styles?.tableBodyRow}
						>
							{selectable ? (
								<td
									key="select"
									className={classNames(
										"table-cell",
										"table-cell--select"
									)}
									style={styles?.tableBodyCell}
								>
									<button
										className={classNames("select")}
										onClick={() => {
											if (updateData && data) {
												const newData = data?.map(
													(item, i) => {
														if (i === index) {
															return {
																...item,
																selected:
																	item?.selected
																		? false
																		: true,
															};
														}
														return item;
													}
												);
												updateData(newData);
											}
										}}
										style={{
											backgroundImage: row.selected
												? "url(/vectors/tick-filled.svg)"
												: "unset",
										}}
									/>
								</td>
							) : null}
							{showIndex ? (
								<td
									key="index"
									className={classNames("table-cell")}
									style={{
										textAlign: "left",
										...styles?.tableBodyCell,
									}}
								>
									{index + 1}
								</td>
							) : null}
							{fields?.map((field) =>
								field?.hidden ? null : (
									<TableCell
										key={[
											field?.id,
											field?.key?.toString(),
											row?.[field?.key]?.toString(),
											formatCell(
												row?.[field?.key],
												field?.formatter
											)?.toString(),
											Date.now(),
											randomId(),
										].join("-")}
										field={field}
										row={row}
										index={index}
										updateData={updateData}
										data={data}
										style={styles?.tableBodyCell}
									/>
								)
							)}
						</TableRow>
					))}
					{data.length === 0 ? (
						<tr
							className={classNames("table-empty")}
							style={{
								backgroundImage: "url(/images/lost.png)",
								border: "none",
							}}
						>
							<td
								colSpan={fields.length}
								style={{
									border: "none",
									padding: "64px 0",
								}}
							>
								No data to show
							</td>
						</tr>
					) : null}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
