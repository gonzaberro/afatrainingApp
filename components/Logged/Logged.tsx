import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import NavBar from "../NavBar/NavBar";
import Planifications from "../Planifications/Planifications";

export default function Logged() {
	return (
		<View style={styles.container}>
			<View style={styles.containerView}>
				<Planifications />
				<NavBar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",

		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	containerView: {
		paddingTop: 50,
		height: "100%",
		width: "100%",
		backgroundColor: "#000000",
		position: "relative",
	},
});
