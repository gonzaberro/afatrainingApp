// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { DEFAULT_USER } from "../constants/usersConstants";
import { createSlice } from "@reduxjs/toolkit";
import { User as LoggedUser } from "../interfaces/interface";

interface State {
	loading: boolean;
	loadingAuth: boolean;
	pageTitle: string;
	isMobile: boolean;
	darkTheme: boolean;
	themeColor: string;
	user: LoggedUser;
	logged: boolean;
}

const initialState: State = {
	loading: false,
	loadingAuth: true,
	pageTitle: "",
	isMobile: false,
	darkTheme: true,
	themeColor: "#4285f4",
	user: DEFAULT_USER,
	logged: false,
};

export const dataSlice = createSlice({
	name: "General",
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setLoadingAuth: (state, action) => {
			state.loadingAuth = action.payload;
		},
		reduxSignOut: state => {
			state.logged = false;
			state.user = DEFAULT_USER;
		},
		setDarkTheme: (state, action) => {
			state.darkTheme = action.payload;
		},
		setThemeColor: (state, action) => {
			state.themeColor = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			state.logged = action.payload.uid !== "";
			state.loading = false;
		},
		setMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		setPageTitle: (state, action) => {
			state.pageTitle = action.payload;
		},
		setLogged: (state, action) => {
			state.logged = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setLoading,
	setDarkTheme,
	setThemeColor,
	setUser,
	setMobile,
	setPageTitle,
	reduxSignOut,
	setLoadingAuth,
	setLogged,
} = dataSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default dataSlice.reducer;

export const getLoading = (state: RootState) => {
	return state.generalReducer.loading;
};
export const getLoadingAuth = (state: RootState) => {
	return state.generalReducer.loadingAuth;
};
export const getDarkTheme = (state: RootState) => {
	return state.generalReducer.darkTheme;
};

export const getThemeColor = (state: RootState) => {
	return state.generalReducer.themeColor;
};

export const getUser = (state: RootState) => {
	return state.generalReducer.user;
};

export const getIsLogged = (state: RootState) => {
	return state.generalReducer.logged;
};

export const getIsMobile = (state: RootState) => {
	return state.generalReducer.isMobile;
};

export const getPageTitle = (state: RootState) => {
	return state.generalReducer.pageTitle;
};
