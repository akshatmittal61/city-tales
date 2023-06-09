import { AiFillInstagram } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";

const socials: {
	name: string;
	url: string;
	icon: any;
}[] = [
	{
		name: "Instagram",
		url: "https://www.instagram.com/_citytales",
		icon: <AiFillInstagram />,
	},
	{
		name: "WhatsApp",
		url: "https://wa.me/919654398815",
		icon: <RiWhatsappFill />,
	},
	{
		name: "Email",
		url: "mailto:rameenphoenix@gmail.com",
		icon: <IoMdMail />,
	},
];

export default socials;
