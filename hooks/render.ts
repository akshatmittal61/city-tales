import { useEffect, useState } from "react";

const useRender = () => {
	const [render, setRender] = useState<"client" | "server">("server");

	useEffect(() => {
		setTimeout(() => {
			setRender("client");
		}, 2000);
	}, []);

	return render;
};

export default useRender;
