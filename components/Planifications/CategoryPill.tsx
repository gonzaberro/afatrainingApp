import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradientColors } from "../../constants/categoryPills";

interface Props {
	text: string;
}

export default function CategoryPill({ text }: Props) {
	return (
		<View>
			<LinearGradient
				colors={
					gradientColors[text.toUpperCase() as keyof typeof gradientColors]
				}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.redPill}
			>
				<Text style={styles.text}>{text}</Text>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	redPill: {
		borderRadius: 20,
		alignSelf: "flex-start",
		marginTop: 10,
	},
	text: {
		color: "white",
		fontWeight: "700",
		paddingVertical: 8,
		paddingHorizontal: 15,
	},
});
