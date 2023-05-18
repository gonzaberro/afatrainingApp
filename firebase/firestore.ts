import firebase from "firebase/compat/app";
import {
	GoogleAuthProvider,
	signInWithCredential,
	getAuth,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";

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
const auth = getAuth(app);

export const db = getFirestore(app);

export const authFirebase = (accessToken: string, idToken: string) => {
	const credential = GoogleAuthProvider.credential(idToken, accessToken);
	console.log("here");
	signInWithCredential(auth, credential)
		.then(userCredential => {
			// User successfully signed in with the credential
			const user = userCredential.user;
			console.log("logged");
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

				console.log(resultData);
			}
		})
		.catch(() => {
			console.log("Error al traer la informacion 222");
		});
}
