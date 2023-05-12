import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import { fetchAuthenticatedUser } from "@/utils/api/auth";

const useAuth = () => {
	const { user: ContextUser } = useContext(GlobalContext);
	const [user, setUser] = useState<any>(ContextUser);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async function () {
			try {
				setLoading(true);
				if (localStorage.getItem("token")) {
					if (ContextUser) {
						setUser(ContextUser);
						setLoggedIn(true);
						setLoading(false);
					} /* else {
						await dispatch(getAuthenticatedUser())
							.then(unwrapResult)
							.then((fetchedUser: any) => {
								if (fetchedUser.user) {
									setUser(fetchedUser.user);
									setLoggedIn(true);
									setLoading(false);
								} else {
									setUser(null);
									setLoggedIn(false);
									setLoading(false);
								}
							})
							.catch((err: any) => {
								console.error(err);
								setUser(null);
								setLoggedIn(false);
								setLoading(false);
							});
					} */
				} else {
					setUser(null);
					setLoggedIn(false);
					setLoading(false);
				}
			} catch (error) {
				console.error(error);
				setUser(null);
				setLoggedIn(false);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		})();
	}, [ContextUser]);

	return {
		user,
		loggedIn,
		loading,
	};
};

export default useAuth;
