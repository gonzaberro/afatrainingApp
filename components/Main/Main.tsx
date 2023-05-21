import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginPage from "../Login/LoginPage";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	setLogged,
	getIsLogged,
	setUser,
	getUser,
	setLoading,
	setLoadingAuth,
} from "../../reducers/generalReducer";
import { auth } from "../../firebase/firebase";
import { currentUser } from "../../firebase/firestore";
import { createUserObject } from "../../utils/loginUtils";
import Logged from "../Logged/Logged";

export default function Main() {
	const dispatch = useDispatch();
	const userLogged = useSelector(getUser);
	const logged = useSelector(getIsLogged);

	let timer: any;

	const delayStateChange = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			dispatch(setLoadingAuth(false));
		}, 1000);
	};

	React.useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user && !logged) {
				clearTimeout(timer);
				dispatch(setLoading(true));
				currentUser(createUserObject(user), dispatch);
			} else {
				delayStateChange();
			}
		});
	}, []);

	return <>{!logged || !userLogged ? <LoginPage /> : <Logged />}</>;
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
