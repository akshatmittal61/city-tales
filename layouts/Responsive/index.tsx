import React from "react";

interface IResponsiveRow extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

interface IResponsiveCol extends React.HTMLAttributes<HTMLDivElement> {
	xlg?: number;
	lg?: number;
	md?: number;
	sm?: number;
	children: React.ReactNode;
}

interface IResponsive {
	Row: React.FC<IResponsiveRow>;
	Col: React.FC<IResponsiveCol>;
}

const Row: React.FC<IResponsiveRow> = ({ children, ...rest }) => (
	<div className="row" {...rest}>
		{children}
	</div>
);

const Col: React.FC<IResponsiveCol> = ({
	xlg = 100,
	lg = 100,
	md = 100,
	sm = 100,
	children,
	...rest
}) => (
	<div
		className={`col-xlg-${xlg} col-lg-${lg} col-md-${md} col-sm-${sm}`}
		{...rest}
	>
		{children}
	</div>
);

const Responsive: IResponsive = {
	Row,
	Col,
};

Responsive.Row = Row;
Responsive.Col = Col;

export default Responsive;
