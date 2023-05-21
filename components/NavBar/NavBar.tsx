import { faClipboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMenuSelected, setMenuSelected } from "../../reducers/menuReducer";
import { menuOptions } from "../../constants/menuOptions";

export default function NavBar() {
	const dispatch = useDispatch();

	const selectedMenu = (menu: string) => {
		dispatch(setMenuSelected(menu));
	};

	return (
		<>
			<View style={styles.navBar}>
				<FontAwesomeIcon icon={faUser} size={20} color={"white"} />
			</View>
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.titleText}> Planificaciones </Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 50,
		height: "10%",
		paddingHorizontal: 20,
		backgroundColor: "rgba(28, 28, 30, 0.6);",
		width: "100%",
		paddingTop: 20,
		zIndex: 2,
		elevation: 2,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	navBar: {
		position: "absolute",
		top: 70,
		left: 20,
		zIndex: 3,
		elevation: 3,
		padding: 10,
		borderRadius: 100,
	},
	title: {
		textAlign: "center",
		marginBottom: 20,
	},
	titleText: {
		fontSize: 20,
		color: "white",
		fontWeight: "800",
	},
});
