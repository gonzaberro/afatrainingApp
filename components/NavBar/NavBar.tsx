import { faClipboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMenuSelected, setMenuSelected } from "../../reducers/menuReducer";
import { menuOptions } from "../../constants/menuOptions";

export default function NavBar() {
	const dispatch = useDispatch();
	const menuSelected = useSelector(getMenuSelected);

	const selectedMenu = (menu: string) => {
		dispatch(setMenuSelected(menu));
	};

	const getStylesMenuOption = (menu: string) => {
		let menuStyles = styles.menuOption;

		if (menu === menuSelected) {
			menuStyles = { ...menuStyles, ...styles.menuOptionSelected };
		}

		return menuStyles;
	};

	const getStylesMenuText = (menu: string) => {
		let menuStyles = styles.menuOptionText;

		if (menu === menuSelected) {
			menuStyles = { ...menuStyles, ...styles.menuOptionTextSelected };
		}

		return menuStyles;
	};

	const getIconColor = (menu: string) => {
		const color = "white";
		if (menu === menuSelected) {
			return "#4285f4";
		}

		return color;
	};

	return (
		<View style={styles.container}>
			<View style={styles.navBar}>
				<TouchableOpacity onPress={() => selectedMenu(menuOptions.PROFILE)}>
					<View style={getStylesMenuOption(menuOptions.PROFILE)}>
						<FontAwesomeIcon
							icon={faUser}
							size={15}
							color={getIconColor(menuOptions.PROFILE)}
						/>
						<Text style={getStylesMenuText(menuOptions.PROFILE)}>Perfil</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => selectedMenu(menuOptions.PLANIFICATIONS)}
				>
					<View style={getStylesMenuOption(menuOptions.PLANIFICATIONS)}>
						<FontAwesomeIcon
							icon={faClipboard}
							size={15}
							color={getIconColor(menuOptions.PLANIFICATIONS)}
						/>
						<Text style={getStylesMenuText(menuOptions.PLANIFICATIONS)}>
							Planificaciones
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		height: 120,
		width: "100%",
		paddingHorizontal: 20,
		backgroundColor: "black",
		paddingTop: 20,
	},
	navBar: {
		width: "100%",
		height: "70%",

		borderRadius: 20,
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "row",
	},
	menuOption: {
		margin: 10,
		padding: 20,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		gap: 20,
		width: 120,
	},
	menuOptionText: {
		fontSize: 10,
		color: "white",
		fontWeight: "700",
	},
	menuOptionTextSelected: {
		fontSize: 10,
		color: "#4285f4",
		fontWeight: "700",
	},
	menuOptionSelected: {
		backgroundColor: "rgba(122, 122, 122, 0.2);",
		color: "#4285f4",
	},
});
