// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interface";
import { menuOptions } from "../constants/menuOptions";

interface State {
	menuSelected: string;
}

const initialState: State = {
	menuSelected: menuOptions.PLANIFICATIONS,
};

export const dataSlice = createSlice({
	name: "Menu",
	initialState: initialState,
	reducers: {
		setMenuSelected: (state, action) => {
			state.menuSelected = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setMenuSelected } = dataSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default dataSlice.reducer;

export const getMenuSelected = (state: RootState) => {
	return state.menuReducer.menuSelected;
};
