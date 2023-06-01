import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@/global/slices/user";
import { getAuthenticatedUser } from "@/global/helpers/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { USER_ROLES } from "@/types/auth";

const useAuth = () => {
	const ContextUser = useSelector(userSelector);
	const dispatch = useDispatch<any>();
	const [user, setUser] = useState<any>(ContextUser);
	const [role, setRole] = useState<USER_ROLES | null>("user");
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async function () {
			try {
				setLoading(true);
				if (localStorage.getItem("token")) {
					if (ContextUser) {
						setUser(ContextUser);
						setRole(ContextUser.role);
						setLoggedIn(true);
						setLoading(false);
					} else {
						await dispatch(getAuthenticatedUser())
							.then(unwrapResult)
							.then((fetchedUser: any) => {
								if (fetchedUser.user) {
									setUser(fetchedUser.user);
									setRole(fetchedUser.user.role);
									setLoggedIn(true);
									setLoading(false);
								} else {
									setUser(null);
									setRole(null);
									setLoggedIn(false);
									setLoading(false);
								}
							})
							.catch((err: any) => {
								console.error(err);
								setUser(null);
								setRole(null);
								setLoggedIn(false);
								setLoading(false);
							});
					}
				} else {
					setUser(null);
					setRole(null);
					setLoggedIn(false);
					setLoading(false);
				}
			} catch (error) {
				console.error(error);
				setUser(null);
				setRole(null);
				setLoggedIn(false);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		})();
	}, [ContextUser, dispatch]);

	return {
		user,
		role,
		loggedIn,
		loading,
	};
};

export default useAuth;
