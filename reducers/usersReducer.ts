// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interface";

interface State {
  users: User[];
  search: string;
}

const initialState: State = {
	users: [],
	search: "",
};

export const dataSlice = createSlice({
	name: "User",
	initialState: initialState,
	reducers: {
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		setSearchUser: (state, action) => {
			state.search = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUsers, setSearchUser } = dataSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default dataSlice.reducer;

export const getUsers = (state: RootState) => {
  return state.usersReducer.users;
};

export const getSearch = (state: RootState) => {
  return state.usersReducer.search;
};
