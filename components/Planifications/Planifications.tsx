import { useEffect } from "react";
import MonthPicker from "./MonthPicker";
import PlanificationItem from "./PlanificationItem";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	getMonthSelected,
	getPlanificationLoading,
} from "../../reducers/planificationReducer";
import { getMonthSelectedFormat } from "../../utils/dateUtils";
import { getUser } from "../../reducers/generalReducer";
import { getPlanifications } from "../../firebase/firestore";
import { getPlanificationList } from "../../reducers/planificationReducer";
import PlanificationList from "./PlanificationList";

export default function Planifications() {
	const monthSelected = useSelector(getMonthSelected);
	const dispatch = useDispatch();
	const loggedUser = useSelector(getUser);
	const loading = useSelector(getPlanificationLoading);

	useEffect(() => {
		if (loggedUser.uid !== "") {
			getPlanifications(
				loggedUser,
				dispatch,
				getMonthSelectedFormat(monthSelected)
			);
		}
	}, [monthSelected]);

	return (
		<>
			<MonthPicker />
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={"large"} color="#4285f4" />
				</View>
			) : (
				<PlanificationList />
			)}
		</>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 20,
		height: "60%",
	},
	loadingText: {
		color: "white",
		fontSize: 17,
	},
});
