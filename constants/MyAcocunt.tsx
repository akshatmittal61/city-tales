import { MyAccountSidePaneNavigationItem } from "@/types/MyAccount";
import { Bookmark } from "react-feather";
import { IoMdPerson } from "react-icons/io";
import { RiCalendar2Line, RiMessageLine } from "react-icons/ri";

export const sidePaneNavigation: MyAccountSidePaneNavigationItem[] = [
	{
		id: "personal-info",
		label: "Personal Info",
		icon: <IoMdPerson />,
	},
	{
		id: "my-events",
		label: "My Events",
		icon: <RiCalendar2Line />,
	},
	{
		id: "my-bookmarks",
		label: "My Bookmarks",
		icon: <Bookmark />,
	},
	{
		id: "my-review",
		label: "My Review",
		icon: <RiMessageLine />,
	},
];
