import * as React from "react";
import { StyleSheet } from "react-native";
import { store } from "./store";
import { Provider } from "react-redux";
import Main from "./components/Main/Main";

declare global {
	type RootState = ReturnType<typeof store.getState>;
}

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
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
