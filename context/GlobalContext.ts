import { createContext } from "react";

const GlobalContext = createContext({
	user: null,
	setUser: (_: any) => {},
});

export default GlobalContext;
