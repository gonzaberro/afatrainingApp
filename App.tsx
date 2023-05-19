import * as React from "react";
import * as WebBrowser from "expo-web-browser";
export const BACKGROUND = require("./assets/logo.png");
export const GOOGLE = require("./assets/google.png");
import { auth, getExercises } from "./firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import LoginPage from "./components/LoginPage";
import { SafeAreaView, StyleSheet, Text, Image } from "react-native";

export default function App() {
	const [logged, setLogged] = React.useState(false);
	const [userLogged, setUser] = React.useState<User>();

	React.useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user && !logged) {
				setLogged(true);

				setUser(user);
			}
		});
	}, []);

	return (
		<>
			{!logged || !userLogged ? (
				<LoginPage />
			) : (
				<SafeAreaView style={styles.container}>
					<Text>Logged: {userLogged.displayName}</Text>
					<Image
						source={{ uri: userLogged.photoURL || "" }}
						style={{ width: 200, height: 200 }}
					/>
				</SafeAreaView>
			)}
		</>
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
});
