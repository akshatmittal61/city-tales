export type TNavigationItem =
	| "personal-info"
	| "my-events"
	| "my-bookmarks"
	| "my-review";

export interface MyAccountSidePaneNavigationItem {
	id: TNavigationItem;
	label: string;
	icon: any;
}
