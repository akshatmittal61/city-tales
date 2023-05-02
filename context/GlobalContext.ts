import { createContext } from "react";

const GlobalContext = createContext({
	user: null,
	setUser: (_: any) => {},
	logout: () => {},
});

export default GlobalContext;
