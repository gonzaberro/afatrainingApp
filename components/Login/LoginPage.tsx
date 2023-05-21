import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import {
	SafeAreaView,
	Text,
	ImageBackground,
	View,
	TouchableOpacity,
	Image,
	Linking,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { authFirebase } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingAuth, setLoadingAuth } from "../../reducers/generalReducer";

export const BACKGROUND = require("../../assets/logo.png");
export const GOOGLE = require("../../assets/google.png");

export default function LoginPage() {
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId:
			"596696153702-c6si0avpcdtgd7olunifj1fpuid7t6gm.apps.googleusercontent.com",
		iosClientId:
			"596696153702-p53khs5n8kq9srpbm7nd7v16hqi31kjn.apps.googleusercontent.com",
	});
	const dispatch = useDispatch();
	const loadingAuth = useSelector(getLoadingAuth);

	React.useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response;
			if (authentication?.accessToken) {
				dispatch(setLoadingAuth(true));
				authFirebase(
					authentication?.accessToken,
					authentication?.idToken || ""
				);
			}
		}
	}, [response]);

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
						<Text style={styles.text}>
							{loadingAuth ? "Buscando Sesión..." : "Iniciar Sesión con Google"}
						</Text>
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
