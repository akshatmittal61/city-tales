import { UserSlice } from "@/types/store";
import { createSlice } from "@reduxjs/toolkit";
import { getAuthenticatedUser, loginUser, logoutUser } from "../helpers/user";

const initialState: UserSlice = {
	user: null,
	token: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.token = action.payload.token;
			localStorage.setItem("token", action.payload.token);
		}),
			builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
				state.user = action.payload;
			}),
			builder.addCase(getAuthenticatedUser.rejected, (state) => {
				state.user = null;
			}),
			builder.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { setUser, logout } = userSlice.actions;

export const userSelector = (state: { user: UserSlice }) => state.user.user;
