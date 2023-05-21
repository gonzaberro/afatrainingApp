// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice } from "@reduxjs/toolkit";
import { ExerciseState } from "../interfaces/interface";

const initialState: ExerciseState = {
	categories: {},
	userExercises: {},
};

export const dataSlice = createSlice({
	name: "Exercise",
	initialState: initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
		},

		setExerciseConfigurations: (state, action) => {
			state.categories = action.payload.categories;
		},

		setUserExercises: (state, action) => {
			state.userExercises = action.payload.categories;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCategories, setExerciseConfigurations } = dataSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default dataSlice.reducer;

export const getCategories = (state: RootState) => {
	return state.exerciseReducer.categories;
};

export const getSubCategoriesByCategory = (
	state: RootState,
	category: string
) => {
	return state.exerciseReducer.categories[category];
};

export const getConfigurations = (state: RootState) => {
	return state.exerciseReducer;
};

export const getUserExercises = (state: RootState) => {
	return state.exerciseReducer.userExercises;
};
