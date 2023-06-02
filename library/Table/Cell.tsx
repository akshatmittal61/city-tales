import React, { useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { classNames, formatCell } from "./functions";
import { ITableHeadField } from "./types";

interface ITableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
	field: ITableHeadField;
	row: any;
	index: number;
	updateData?: any;
	data?: any;
	style?: React.CSSProperties;
}

const TableCell: React.FC<ITableCellProps> = ({
	field,
	row,
	index,
	updateData,
	data,
	style,
	...rest
}) => {
	const [inputValue, setInputValue] = useState<string | number>(
		row?.[field.key]
	);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const saveNewData = async () => {
		if (updateData && data) {
			const newData = data.map((item: any, dataIndex: any) => {
				if (dataIndex === index) {
					return {
						...item,
						[field.key]: inputValue,
					};
				}
				return item;
			});
			await updateData(newData);
		}
	};

	return (
		<td
			key={field.id}
			className={classNames("table-cell")}
			style={{
				textAlign: field?.align ?? "left",
				...style,
				...field.style,
			}}
			title={
				field?.tooltip ? field?.tooltip(row[field.key]) : row[field.key]
			}
			{...rest}
		>
			{field?.isEditable ? (
				<input
					type="text"
					className={classNames("table-cell--input", {
						"table-cell--input--editing": isEditing,
					})}
					ref={inputRef}
					value={
						isEditing
							? inputValue
							: field.validator
							? field.validator(row[field.key])
								? formatCell(
										row?.[field.key],
										field?.formatter,
										field?.fallback
								  )
								: "Invalid value"
							: formatCell(
									row?.[field.key],
									field?.formatter,
									field?.fallback
							  )
					}
					onChange={(e) => {
						e.preventDefault();
						setInputValue(e.target.value);
					}}
					onFocus={() => setIsEditing(true)}
					onBlur={() => {
						saveNewData()
							.then(() => setIsEditing(false))
							.catch(() => {
								toast.error("Failed to Save");
							});
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							saveNewData()
								.then(() => setIsEditing(false))
								.catch(() => {
									toast.error("Failed to Save");
								});
						}
					}}
					style={{
						width:
							(isEditing
								? inputValue
								: field.validator
								? field.validator(row[field.key])
									? formatCell(
											row?.[field.key],
											field?.formatter,
											field?.fallback
									  )
									: "Invalid value"
								: formatCell(
										row?.[field.key],
										field?.formatter,
										field?.fallback
								  )
							)?.toString().length +
							2 +
							"ch",
						minWidth: "70px",
					}}
				/>
			) : (
				formatCell(row?.[field?.key], field?.formatter, field?.fallback)
			)}
			{field.showCopy ? (
				<button
					className={classNames("table-cell--copy")}
					onClick={() => {
						navigator.clipboard
							.writeText(
								field.copyValue
									? field.copyValue(row[field.key]).toString()
									: row[field.key].toString()
							)
							.then(() => {
								toast.success("Copied to clipboard");
							})
							.catch(() => {
								toast.error("Error while copying to clipboard");
							});
					}}
				>
					<IoCopyOutline
						style={{
							pointerEvents: "none",
						}}
					/>
				</button>
			) : null}
		</td>
	);
};

export default TableCell;
