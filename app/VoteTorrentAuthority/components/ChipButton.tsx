import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@react-navigation/native";

interface ChipButtonProps {
	label: string;
	icon: string;
	onPress: () => void;
}

export function ChipButton({ label, icon, onPress }: ChipButtonProps) {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, { backgroundColor: colors.card }]}
		>
			<ThemedText>{label}</ThemedText>
			<FontAwesome
				name={icon as any}
				size={14}
				color={colors.text}
				style={styles.icon}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	icon: {
		marginLeft: 6,
	},
});
