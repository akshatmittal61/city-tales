import { MyAccountSidePaneNavigationItem } from "@/types/MyAccount";
import { IoMdPerson } from "react-icons/io";
import { RiCalendar2Line, RiMessageLine } from "react-icons/ri";

export const sidePaneNavigation: MyAccountSidePaneNavigationItem[] = [
	{
		id: "personal-info",
		label: "Personal Info",
		icon: <IoMdPerson />,
	},
	{
		id: "my-review",
		label: "My Review",
		icon: <RiMessageLine />,
	},
	{
		id: "my-events",
		label: "My Events",
		icon: <RiCalendar2Line />,
	},
];
