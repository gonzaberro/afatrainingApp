// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { DEFAULT_USER } from "../constants/usersConstants";
import { createSlice } from "@reduxjs/toolkit";
import {
	PlanificationBlocks,
	Planification,
	User,
} from "../interfaces/interface";

interface State {
	loading: boolean;
	monthSelected: Date;
	planifications: Planification[];
	planificationUser: User;
	planificationExercises: PlanificationBlocks;
}

const initialState: State = {
	loading: true,
	monthSelected: new Date(),
	planifications: [],
	planificationUser: DEFAULT_USER,
	planificationExercises: {},
};

export const dataSlice = createSlice({
	name: "Planifications",
	initialState: initialState,
	reducers: {
		setPlanifications: (state, action) => {
			state.planifications = action.payload;
		},
		setPlanificationExercises: (state, action) => {
			state.planificationExercises = action.payload;
		},
		setUserPlanifications: (state, action) => {
			state.planifications = action.payload.planifications || [];
			state.planificationExercises =
				action.payload.planificationExercises || [];
			state.loading = false;
		},
		setPlanificationsToDefault: state => {
			state.planifications = [];
			state.planificationExercises = {};
			state.loading = false;
		},
		setPlanificationUser: (state, action) => {
			state.planificationUser = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setMonthSelected: (state, action) => {
			state.monthSelected = action.payload;
			state.loading = true;
		},
		setInitPlanification: state => {
			state.monthSelected = new Date();
			state.planifications = [];
			state.planificationExercises = {};
			state.planificationUser = DEFAULT_USER;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setPlanifications,
	setPlanificationExercises,
	setPlanificationsToDefault,
	setPlanificationUser,
	setLoading,
	setUserPlanifications,
	setMonthSelected,
	setInitPlanification,
} = dataSlice.actions;

// You must export the reducer as follows for it to be able to be read by the store.
export default dataSlice.reducer;

export const getPlanificationList = (state: RootState) => {
	return state.planificationReducer.planifications;
};

export const getPlanificationBlocks = (state: RootState) => {
	return state.planificationReducer.planificationExercises;
};

export const getPlanificationBlocksByPlanification = (
	state: RootState,
	planification: string
) => {
	return state.planificationReducer.planificationExercises[planification] || [];
};

export const getPlanificationUser = (state: RootState) => {
	return state.planificationReducer.planificationUser;
};

export const getPlanificationLoading = (state: RootState) => {
	return state.planificationReducer.loading;
};

export const getMonthSelected = (state: RootState) => {
	return state.planificationReducer.monthSelected;
};
