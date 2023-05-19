import firebase from "firebase/compat/app";
import {
	GoogleAuthProvider,
	signInWithCredential,
	getAuth,
	initializeAuth,
	indexedDBLocalPersistence,
	browserLocalPersistence,
	setPersistence,
	OAuthCredential,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
import { refreshAsync } from "expo-auth-session";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
	apiKey: "AIzaSyCgWMkjXQHp5R5UGCFajnB8adijATGsIzg",
	authDomain: "afatraining-f1b0a.firebaseapp.com",
	projectId: "afatraining-f1b0a",
	storageBucket: "afatraining-f1b0a.appspot.com",
	messagingSenderId: "596696153702",
	appId: "1:596696153702:web:a52318ada28a313d47f7a7",
	measurementId: "G-T7WFM79DSN",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const authFirebase = (accessToken: string, idToken: string) => {
	console.log("here");

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
			console.log("error");
		});
};

const CONFIURATION_COLLECTION = "configuraciones";
const CONFIURATION_DOCUMENT_EXERCISE = "ejercicios";

const configurationCollectionRef = doc(
	db,
	CONFIURATION_COLLECTION,
	CONFIURATION_DOCUMENT_EXERCISE
);

export function getExercises() {
	getDoc(configurationCollectionRef)
		.then(result => {
			if (result.exists()) {
				const resultData = result.data().ejercicios;
				alert("OK al traer ejercicios");
				console.log(resultData);
			}
		})
		.catch(() => {
			console.log("Error al traer la informacion 222");
			alert("Error al traer ejercicios");
		});
}

setPersistence(auth, browserLocalPersistence)
	.then(() => {
		// Existing and future Auth states are now persisted in the current
		// session only. Closing the window would clear any existing state even
		// if a user forgets to sign out.
		// ...
		// New sign-in will be persisted with session persistence.

		return authFirebase;
	})
	.catch(error => {
		// Handle Errors here.
		// const errorCode = error.code;
		// const errorMessage = error.message;
	});