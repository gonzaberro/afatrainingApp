import PlanificationItem from "./PlanificationItem";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getPlanificationList } from "../../reducers/planificationReducer";

export default function PlanificationList() {
	const planifications = useSelector(getPlanificationList);

	return (
		<>
			{planifications.length > 0 ? (
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}
				>
					{planifications.map(planification => {
						return <PlanificationItem planification={planification} />;
					})}
				</ScrollView>
			) : (
				<View style={styles.containerEmptyList}>
					<Text style={styles.emptyText}>No tenés planificaciones</Text>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	containerEmptyList: {
		display: "flex",
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		width: "100%",
		marginTop: 20,
	},
	emptyText: {
		color: "white",
		fontSize: 17,
	},
	scrollView: {
		marginBottom: 120,
	},
});
