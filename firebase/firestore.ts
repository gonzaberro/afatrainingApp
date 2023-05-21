import { Dispatch } from "@reduxjs/toolkit";
import {
	setDoc,
	doc,
	serverTimestamp,
	getDoc,
	deleteDoc,
	getDocs,
	collection,
	arrayUnion,
	arrayRemove,
	updateDoc,
} from "firebase/firestore";
import {
	ExerciseObject,
	User,
	Roles,
	Planification,
	PlanificationBlocks,
	GroupedRecords,
} from "../interfaces/interface";
import { setExerciseConfigurations } from "../reducers/exerciseReducer";
import { setUser } from "../reducers/generalReducer";
import { db } from "./firebase";
import { setUsers } from "../reducers/usersReducer";
import {
	setPlanificationsToDefault,
	setUserPlanifications,
} from "../reducers/planificationReducer";

const USER_COLLECTION = "usuarios";
const PLANIFICATIONS_COLLECTION = "planifications";
const CONFIURATION_COLLECTION = "configuraciones";
const CONFIURATION_DOCUMENT_EXERCISE = "ejercicios";
const EXERCISE_INFORMATION_COLLECTION = "registro_ejercicios";
const ROLES_COLLECTION = "roles";

const configurationCollectionRef = doc(
	db,
	CONFIURATION_COLLECTION,
	CONFIURATION_DOCUMENT_EXERCISE
);
async function getUserFirebase(email: string) {
	try {
		const userCollectionRef = doc(db, USER_COLLECTION, email);

		return getDoc(userCollectionRef).then(result => {
			if (result.exists()) {
				return result.data().user;
			}
			return null;
		});
	} catch (error) {
		console.log("Error al traer la informacion 55");
	}
}

async function createUser(user: User) {
	try {
		if (user.email === "") return null;
		const userCollectionRef = doc(db, USER_COLLECTION, user.email);
		const userDoc = await getUserFirebase(user.email);
		if (userDoc === null) {
			return await setDoc(userCollectionRef, {
				user,
				lastUpdate: serverTimestamp(),
			});
		}
	} catch (error) {
		console.log("Error al traer la informacion 67");
	}
}

async function updateUserData(user: User) {
	try {
		const userCollectionRef = doc(db, USER_COLLECTION, user.email);

		const userData = await getDoc(userCollectionRef).then(() => {
			updateDoc(userCollectionRef, {
				user,
				lastUpdate: serverTimestamp(),
			});
		});

		return userData;
	} catch (error) {
		console.log("Error al traer la informacion 80");
	}
}

async function getTrainersIds() {
	try {
		const rolesCollectionRef = doc(db, ROLES_COLLECTION, "entrenadores");

		return await getDoc(rolesCollectionRef).then(result => {
			if (result.exists()) {
				return result.data().uids;
			}
			return [];
		});
	} catch (error) {
		console.log("Error al traer la informacion 103");
	}
}

async function getAdminIds() {
	try {
		const rolesCollectionRef = doc(db, ROLES_COLLECTION, "administradores");

		return await getDoc(rolesCollectionRef).then(result => {
			if (result.exists()) {
				return result.data().uids;
			}
			return [];
		});
	} catch (error) {
		console.log("Error al traer la informacion 118");
	}
}

function addRemoveTrainer(user: User) {
	const rolesCollectionRef = doc(db, ROLES_COLLECTION, "entrenadores");
	getDoc(rolesCollectionRef)
		.then(() => {
			if (user.isTrainer) {
				updateDoc(rolesCollectionRef, {
					uids: arrayUnion(user.uid),
					lastUpdate: serverTimestamp(),
				});
			} else {
				updateDoc(rolesCollectionRef, {
					uids: arrayRemove(user.uid),
					lastUpdate: serverTimestamp(),
				});
			}
		})
		.catch(() => {
			console.log("Error al traer la informacion 137");
		});
}

async function getUserRoles(UserUid: string) {
	try {
		const trainerIds = await getTrainersIds();
		const adminIds = await getAdminIds();
		let roles: Roles = { isTrainer: false, isAdmin: false };
		if (trainerIds.some((uid: string) => uid === UserUid)) {
			roles.isTrainer = true;
		}
		if (adminIds.some((uid: string) => uid === UserUid)) {
			roles.isAdmin = true;
		}
		return roles;
	} catch (error) {
		console.log("Error al traer la informacion 156");
	}
}

export async function currentUser(user: User, dispatch: Dispatch) {
	try {
		if (user.email) {
			let userData: User = await getUserFirebase(user.email);

			if (userData !== null) {
				userData = {
					...userData,
					photoURL: user.photoURL,
					displayName: user.displayName,
					uid: user.uid,
					isVerified: true,
				};
				const roles = await getUserRoles(userData.uid);
				userData = { ...userData, ...roles };
				dispatch(setUser(userData));
				updateUserData(userData);
			} else {
				createUser(user);
				dispatch(setUser(user));
			}
		}
	} catch (error) {
		console.log("Error al traer la informacion 183");
	}
}

export function updateExerciseConfigurationObject(
	user: User,
	configurations: ExerciseObject
) {
	if (user.uid === "") {
		return null;
	}
	setDoc(
		configurationCollectionRef,
		{
			ejercicios: { ...configurations },
			lastUpdate: serverTimestamp(),
			lastUpdateBy: user.displayName,
		},
		{ merge: false }
	)
		.then(() => {
			console.log("Se guardaron los cambios en la nube. ☁️");
		})
		.catch(() => {
			console.log("No se pudieron guardar los cambios en la nube.");
		});
}

export function getExerciseConfigurationObject(dispatch: Dispatch) {
	getDoc(configurationCollectionRef)
		.then(result => {
			if (result.exists()) {
				const resultData = result.data().ejercicios;
				if (resultData?.categories) {
					dispatch(setExerciseConfigurations(resultData));
				}
			}
		})
		.catch(() => {
			console.log("Error al traer la informacion 222");
		});
}

export async function signUpUser(user: User) {
	try {
		if (user.email === "") {
			return null;
		}
		addRemoveTrainer(user);
		const userDoc = await getUserFirebase(user.email);
		if (userDoc === null) {
			createUser(user)
				.then(r => console.log("Se guardaron los cambios en la nube."))
				.catch(e =>
					console.log("No se pudieron guardar los datos en la nube.")
				);
			return true;
		} else return false;
	} catch (error) {
		console.log("Error al traer la informacion 242");
	}
}

export async function editUser(user: User) {
	try {
		if (user.email === "") {
			return null;
		}
		addRemoveTrainer(user);
		const userDoc = await getUserFirebase(user.email);
		if (userDoc !== null) {
			updateUserData(user)
				.then(r => console.log("Se guardaron los cambios en la nube."))
				.catch(e =>
					console.log("No se pudieron guardar los datos en la nube.")
				);
			return true;
		} else {
			console.log("Este usuario no existe.");
			return false;
		}
	} catch (error) {
		console.log("Error al traer la informacion 221");
	}
}

export async function deleteUser(user: User) {
	if (user.email === "") {
		return null;
	}
	addRemoveTrainer({ ...user, isTrainer: false });
	return await deleteDoc(doc(db, USER_COLLECTION, user.email))
		.then(() => {
			return true;
		})
		.catch(error => {
			return false;
		});
}

export async function getUsersList(dispatch: Dispatch) {
	try {
		const querySnapshot = await getDocs(collection(db, USER_COLLECTION));
		const userList: User[] = [];
		querySnapshot.forEach(doc => {
			userList.push(doc.data().user);
		});
		dispatch(setUsers(userList));
	} catch (error) {
		console.log("Error al traer la informacion 248");
	}
}

export function updatePlanificationList(
	user: User,
	planifications: Planification[],
	planificationExercises: PlanificationBlocks | {},
	monthSelected: string
) {
	if (user.uid === "") {
		return null;
	}

	const userCollectionRef = doc(
		db,
		PLANIFICATIONS_COLLECTION,
		user.email,
		"planificaciones",
		monthSelected
	);

	setDoc(
		userCollectionRef,
		{
			planifications: planifications,
			planificationExercises: planificationExercises,
		},
		{ merge: true }
	).catch(() => {
		console.log("No se pudieron guardar los cambios en la nube.");
	});
}

export function deletePlanification(
	user: User,
	planifications: Planification[],
	planificationExercises: PlanificationBlocks | {},
	monthSelected: string
) {
	if (user.uid === "") {
		return null;
	}

	const userCollectionRef = doc(
		db,
		PLANIFICATIONS_COLLECTION,
		user.email,
		"planificaciones",
		monthSelected
	);

	setDoc(userCollectionRef, {
		planifications: planifications,
		planificationExercises: planificationExercises,
	}).catch(() => {
		console.log("No se pudieron guardar los cambios en la nube.");
	});
}
export async function getPlanifications(
	user: User,
	dispatch: Dispatch,
	monthSelected: string
) {
	if (user.email === "") {
		return null;
	}

	getDoc(
		doc(
			db,
			PLANIFICATIONS_COLLECTION,
			user.email,
			"planificaciones",
			monthSelected
		)
	)
		.then(result => {
			const data = result.data();
			if (!!data) {
				dispatch(setUserPlanifications(data));
			} else {
				dispatch(setPlanificationsToDefault());
			}
		})
		.catch(error => {
			dispatch(setPlanificationsToDefault());
		});
}

export function updateExerciseInformation(
	user: User,
	exercise: string,
	exerciseRecords: GroupedRecords
) {
	if (user.uid === "") {
		return null;
	}

	const userCollectionRef = doc(
		db,
		EXERCISE_INFORMATION_COLLECTION,
		user.email,
		"registros",
		exercise
	);

	setDoc(
		userCollectionRef,
		{
			exerciseRecords,
		},
		{ merge: false }
	)
		.then(() => {
			console.log("Se guardó el comentario.");
		})
		.catch(error => {
			console.log("No se pudieron guardar los cambios en la nube.");
		});
}

export async function getUserExercises(user: User, exercise: string) {
	if (user.email === "") {
		return null;
	}

	const a1DocRef = doc(
		db,
		EXERCISE_INFORMATION_COLLECTION,
		user.email,
		"registros",
		exercise
	);

	return getDoc(a1DocRef as any)
		.then(result => {
			const results: any = result.data();
			return results.exerciseRecords;
		})
		.catch(() => {
			console.log("Error al traer la informacion 444");
		});
}
