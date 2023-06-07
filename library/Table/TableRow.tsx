import React, { useRef } from "react";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	row: any;
	children?: React.ReactNode;
	className?: string;
	rowEvents?: {
		onClick?: (_: any) => void;
		onMouseEnter?: (_: any, __?: any) => void;
		onMouseLeave?: (_: any, __?: any) => void;
	};
}

const TableRow: React.FC<TableRowProps> = ({
	row,
	className,
	children,
	rowEvents = {},
	...rest
}) => {
	const ref = useRef<HTMLTableRowElement>(null);
	return (
		<tr
			ref={ref}
			className={className}
			onClick={(e) => {
				// if clicked element is an input field or a button or a link, do not trigger onRowClick
				if (
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLButtonElement ||
					e.target instanceof HTMLAnchorElement
				)
					return;
				if (rowEvents?.onClick) rowEvents.onClick(row);
			}}
			onMouseEnter={(e) => {
				if (
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLButtonElement ||
					e.target instanceof HTMLAnchorElement
				)
					return;
				if (rowEvents?.onMouseEnter)
					rowEvents.onMouseEnter(row, ref.current);
			}}
			onMouseLeave={(_) => {
				if (rowEvents?.onMouseLeave)
					rowEvents.onMouseLeave(row, ref.current);
			}}
			{...rest}
		>
			{children}
		</tr>
	);
};

export default TableRow;
