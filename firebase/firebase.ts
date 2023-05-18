import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

export { firebase };
