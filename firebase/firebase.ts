import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, signInWithCredential } from "firebase/auth";
import {
	GoogleAuthProvider,
	getReactNativePersistence,
} from "firebase/auth/react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCgWMkjXQHp5R5UGCFajnB8adijATGsIzg",
	authDomain: "afatraining-f1b0a.firebaseapp.com",
	projectId: "afatraining-f1b0a",
	storageBucket: "afatraining-f1b0a.appspot.com",
	messagingSenderId: "596696153702",
	appId: "1:596696153702:web:a52318ada28a313d47f7a7",
	measurementId: "G-T7WFM79DSN",
};

if (!firebase.app.length) {
	firebase.initializeApp(firebaseConfig);
}

const app = firebase.initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const authFirebase = (accessToken: string, idToken: string) => {
	const credential = GoogleAuthProvider.credential(idToken, accessToken);

	signInWithCredential(auth, credential)
		.then(userCredential => {
			// User successfully signed in with the credential

			return userCredential;
			// Do something with the authenticated user
		})
		.catch(error => {
			// An error occurred during sign-in
			// Handle the error appropriately
			console.log("Error signing with credentials");
		});
};

export { firebase };
