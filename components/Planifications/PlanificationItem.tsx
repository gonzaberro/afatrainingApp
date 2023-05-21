import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CategoryPill from "./CategoryPill";
import { Planification } from "../../interfaces/interface";

interface Props {
	planification: Planification;
}

export default function PlanificationItem({ planification }: Props) {
	return (
		<TouchableOpacity style={styles.container}>
			<View>
				<View style={styles.nameContainer}>
					<Text style={styles.nameText}>{planification.name}</Text>
					<Text style={styles.daysText}>({planification.days} días)</Text>
				</View>
				<View>
					<CategoryPill text={planification.objective} />
				</View>
			</View>
			<View>
				<FontAwesomeIcon icon={faChevronRight} color={"#4285f4"} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "rgba(122, 122, 122, 0.2);",
		padding: 15,
		paddingVertical: 20,
		borderRadius: 10,
		height: 80,
		marginTop: 15,
	},
	nameContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 10,
	},
	nameText: {
		color: "white",
		fontSize: 17,
		fontWeight: "700",
	},
	daysText: {
		color: "white",
	},
});
