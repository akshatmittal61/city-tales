import { useState } from "react";

const useContextData = () => {
	const [user, setUser] = useState<any>(null);

	const logout = async () => {
		try {
			setUser(null);
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("access_token");
		} catch (error) {
			console.error(error);
		}
	};

	return { user, setUser, logout };
};

export default useContextData;
