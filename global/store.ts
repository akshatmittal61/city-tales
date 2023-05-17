import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";

const reducer = combineReducers({
	user: userSlice.reducer,
});

const store = configureStore({
	reducer,
});

export default store;
