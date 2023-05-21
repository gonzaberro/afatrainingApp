import { User } from "firebase/auth";
import { User as LoggedUser } from "../interfaces/interface";

export function isWithin10Seconds(epochTime: number) {
	const now = Math.floor(Date.now() / 1000); // Get current epoch time in seconds
	const diff = Math.abs(now - epochTime);
	return diff <= 60; // Calculate difference between epoch time and current time
}

export function createUserObject(user: User): LoggedUser {
	return {
		uid: user.uid || "",
		displayName: user.displayName || "",
		photoURL: user.photoURL || "",
		email: user.email || "",
		isVerified: true,
		isTrainer: false,
		asignedTrainer: "none",
		remote: false,
		objective: "",
		isAdmin: false,
		peso: "0",
		altura: "0",
		deporte: "",
		observaciones: "",
		nacimiento: "",
	};
}

export function checkIsMobile() {
	return typeof navigator !== "undefined"
		? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
		: false;
}
