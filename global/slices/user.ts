import { UserSlice } from "@/types/store";
import { createSlice } from "@reduxjs/toolkit";
import {
	addReview,
	getAuthenticatedUser,
	getUserReview,
	loginUser,
	logoutUser,
	updateUserDetails,
} from "../helpers/user";

const initialState: UserSlice = {
	user: null,
	token: null,
	review: null,
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
			state.token = null;
		},
		setReview: (state, action) => {
			state.review = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.token = action.payload.token;
			localStorage.setItem("token", action.payload.token);
		}),
			builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
			}),
			builder.addCase(getAuthenticatedUser.rejected, (state) => {
				state.user = null;
			}),
			builder.addCase(updateUserDetails.fulfilled, (state, action) => {
				state.user = action.payload.user;
			}),
			builder.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.token = null;
			}),
			builder.addCase(getUserReview.fulfilled, (state, action) => {
				state.review = action.payload;
			}),
			builder.addCase(addReview.fulfilled, (state, action) => {
				state.review = { ...action.payload, isSubmitted: true };
			});
	},
});

export const { setUser, logout } = userSlice.actions;

export const userSelector = (state: { user: UserSlice }) => state.user.user;
export const reviewSelector = (state: { user: UserSlice }) => state.user.review;
