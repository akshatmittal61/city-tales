import { IReview } from "@/types/Review";
import { LoginValues, RegisterValues } from "@/types/auth";
import {
	fetchAuthenticatedUser,
	login,
	patchUserDetails,
	register,
} from "@/utils/api/auth";
import { fetchBookmarkedBlogs } from "@/utils/api/blogs";
import { fetchReview, postReview } from "@/utils/api/user";
import { fetchBookedWalks } from "@/utils/api/walks";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
	"user/registerUser",
	async (user: RegisterValues, { rejectWithValue }) => {
		try {
			const response: any = await register(user);
			return Promise.resolve(response);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (user: LoginValues, { rejectWithValue }) => {
		try {
			const response: any = await login(user);
			return Promise.resolve(response);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const getAuthenticatedUser = createAsyncThunk(
	"user/getAuthenticatedUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchAuthenticatedUser();
			return Promise.resolve(response);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const updateUserDetails = createAsyncThunk(
	"user/updateUserDetails",
	async (
		user: {
			name?: string;
			phone?: string;
			avatar?: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await patchUserDetails(user);
			return Promise.resolve(response);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const logoutUser = createAsyncThunk(
	"user/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			localStorage.removeItem("token");
			return Promise.resolve();
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const getUserReview = createAsyncThunk(
	"user/getUserReview",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await fetchReview(id);
			return Promise.resolve(response.data);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const addReview = createAsyncThunk(
	"user/addReview",
	async (review: IReview, { rejectWithValue }) => {
		try {
			const response = await postReview(review);
			return Promise.resolve(response.data);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const getBookmarkedBlogs = createAsyncThunk(
	"user/getBookmarkedBlogs",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchBookmarkedBlogs();
			return Promise.resolve(response.data);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);

export const getBookedWalks = createAsyncThunk(
	"user/getBookedWalks",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchBookedWalks();
			return Promise.resolve(response.data);
		} catch (error) {
			console.error("Error: ", error);
			return rejectWithValue(error);
		}
	}
);
