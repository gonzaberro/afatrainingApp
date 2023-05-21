import { useState } from "react";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment, { Moment } from "moment";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "moment/locale/es";
import { useDispatch, useSelector } from "react-redux";
import {
	getMonthSelected,
	setMonthSelected,
} from "../../reducers/planificationReducer";

export default function MonthPicker() {
	const dispatch = useDispatch();
	const monthSelected = useSelector(getMonthSelected);

	const handleMonthChange = (amount: number) => {
		dispatch(
			setMonthSelected(moment(monthSelected).add(amount, "months").toDate())
		);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.pickerButton}
				onPress={() => handleMonthChange(-1)}
			>
				<FontAwesomeIcon icon={faChevronLeft} color="white" />
			</TouchableOpacity>

			<View style={styles.monthContainer}>
				<Text style={styles.yearNumber}>
					{moment(monthSelected).format("YYYY").toUpperCase()}
				</Text>
				<Text style={styles.monthName}>
					{moment(monthSelected).format("MMMM").toUpperCase()}
				</Text>
			</View>

			<TouchableOpacity
				style={styles.pickerButton}
				onPress={() => handleMonthChange(1)}
			>
				<FontAwesomeIcon icon={faChevronRight} color="white" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "15%",
		backgroundColor: "rgba(28, 28, 30, 0.6);",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingHorizontal: 30,
	},
	pickerButton: {
		backgroundColor: "#4285f4",
		padding: 10,
		borderRadius: 5,
	},
	monthContainer: { flex: 2 },
	monthName: {
		color: "white",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "900",
	},
	yearNumber: {
		color: "white",
		textAlign: "center",
	},
});
