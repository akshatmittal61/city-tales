import { useState } from "react";

const useContextData = () => {
	const [user, setUser] = useState<any>(null);
	return { user, setUser };
};

export default useContextData;
