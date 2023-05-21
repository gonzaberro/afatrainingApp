import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		display: "flex",
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		textAlign: "center",
	},
	background: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,.46)",
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
	},
	text: {
		color: "black",
		fontSize: 18,
	},
	buttonContainer: {
		borderRadius: 30,
		backgroundColor: "white",
		display: "flex",
		width: "80%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
	},
	googleImage: {
		width: 25,
		height: 25,
	},
	mainText: {
		fontWeight: "900",
		fontSize: 60,
		color: "white",
	},
	secondText: {
		fontWeight: "100",
		fontSize: 40,
		color: "white",
	},
	headerContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	instagramContainer: {
		padding: 8,
		borderRadius: 100,
		backgroundColor: "transparent",
		backgroundImage:
			"linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
	},
	instagram: {
		color: "white",
	},
});
