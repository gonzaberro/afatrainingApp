import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	ImageBackground,
	View,
	TouchableOpacity,
	Image,
	Linking,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
export const BACKGROUND = require("./assets/logo.png");
export const GOOGLE = require("./assets/google.png");
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { authFirebase, getExercises } from "./firebase/firestore";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const [userData, setUserData] = React.useState(null);
	const [acesstoken, setAcessToken] = React.useState<string | undefined | null>(
		null
	);
	const [token, setToken] = React.useState<string | undefined | null>(null);
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId:
			"596696153702-c6si0avpcdtgd7olunifj1fpuid7t6gm.apps.googleusercontent.com",
		iosClientId:
			"596696153702-p53khs5n8kq9srpbm7nd7v16hqi31kjn.apps.googleusercontent.com",
	});

	React.useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response;

			if (authentication?.accessToken) {
				authFirebase(
					authentication?.accessToken,
					authentication?.idToken || ""
				);
			}

			setToken(authentication?.idToken);
			setAcessToken(authentication?.accessToken);
		}
	}, [response]);

	React.useEffect(() => {
		if (acesstoken) {
			getUserInfo();
		}
	}, [acesstoken]);

	const getUserInfo = async () => {
		const res = await fetch(
			"https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + acesstoken
		);
		const response = await res.json();

		setUserData(response);

		const array = getExercises();

		console.log(array);

		return response;
	};

	const signInWithGoogle = () => {
		promptAsync();
	};

	const handleOpenInstagram = () => {
		Linking.openURL("instagram://user?username=afa.training");
	};

	return (
		<ImageBackground
			source={BACKGROUND}
			resizeMode="cover"
			style={styles.backgroundImage}
		>
			<View style={styles.background}>
				<SafeAreaView style={styles.container}>
					<View style={styles.headerContainer}>
						<Text style={styles.mainText}>A.F Alonso</Text>
						<Text style={styles.secondText}>Training</Text>
					</View>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={signInWithGoogle}
					>
						<Image source={GOOGLE} style={styles.googleImage} />
						<Text style={styles.text}>Iniciar Sesión con Google</Text>
					</TouchableOpacity>

					<View style={styles.instagramContainer}>
						<LinearGradient
							colors={["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"]}
							style={styles.instagramContainer}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<TouchableOpacity onPress={handleOpenInstagram}>
								<FontAwesomeIcon
									style={styles.instagram}
									icon={faInstagram}
									size={32}
								/>
							</TouchableOpacity>
						</LinearGradient>
					</View>
				</SafeAreaView>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
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
