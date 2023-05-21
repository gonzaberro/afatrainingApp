import { combineReducers, configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import generalReducer from "./reducers/generalReducer";
import usersReducer from "./reducers/usersReducer";
import exerciseReducer from "./reducers/exerciseReducer";
import planificationReducer from "./reducers/planificationReducer";
import menuReducer from "./reducers/menuReducer";

const rootReducer = combineReducers({
	generalReducer: generalReducer,
	menuReducer: menuReducer,
	usersReducer: usersReducer,
	exerciseReducer: exerciseReducer,
	planificationReducer: planificationReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === "development",
	middleware: [thunk],
});
