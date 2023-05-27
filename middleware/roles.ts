import { jwtSecret } from "@/config";
import { USER_ROLES } from "@/constants/enum";
import { ApiRequest, ApiResponse } from "@/types/api";
import { getUserById } from "@/services/user";
import jwt from "jsonwebtoken";

const isAdmin =
	(next: Function) => async (req: ApiRequest, res: ApiResponse) => {
		try {
			const token = req.headers["x-auth-token"] + "";
			if (!token) {
				return res
					.status(401)
					.json({ message: "No token, authorization denied" });
			}
			const decoded: any = jwt.verify(token, jwtSecret);
			const user = await getUserById(decoded.user.id);
			if (user.role !== USER_ROLES.ADMIN) {
				return res.status(401).json({ message: "Not authorized" });
			}
			req.user = decoded.user;
			return next(req, res);
		} catch (error) {
			return res.status(401).json({ message: "Token is not valid" });
		}
	};

export { isAdmin };
