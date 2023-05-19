import * as React from "react";
import * as WebBrowser from "expo-web-browser";
export const BACKGROUND = require("./assets/logo.png");
export const GOOGLE = require("./assets/google.png");
import { auth, getExercises } from "./firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import LoginPage from "./components/LoginPage";
import { WebView } from "react-native-webview";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const ref = React.useRef<WebView>(null);
	const [logged, setLogged] = React.useState(false);
	const [userLogged, setUser] = React.useState({});

	React.useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user && !logged) {
				setLogged(true);

				setUser(user);
			}
			//console.log("user", user);
			//getExercises();
		});
	}, []);

	return (
		<>
			{!logged || !userLogged ? (
				<LoginPage />
			) : (
				<WebView
					ref={ref}
					injectedJavaScriptBeforeContentLoaded={
						"(function(){localStorage.setItem(`firebase:authUser:AIzaSyCgWMkjXQHp5R5UGCFajnB8adijATGsIzg:[DEFAULT]`, " +
						JSON.stringify(userLogged) +
						")})()"
					}
					source={{ uri: "https://afatraining.vercel.app/" }}
				/>
			)}
		</>
	);
}
