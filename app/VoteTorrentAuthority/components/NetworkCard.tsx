import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "./ThemedText";

interface NetworkCardProps {
	name: string;
	url: string;
	onPress: () => void;
}

export function NetworkCard({ name, url, onPress }: NetworkCardProps) {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.card,
				{
					backgroundColor: colors.card,
				},
			]}
		>
			<Image
				source={require("../assets/images/utah-flag.png")}
				style={styles.image}
			/>
			<View style={styles.content}>
				<ThemedText type="subtitle">{name}</ThemedText>
				<ThemedText>{url}</ThemedText>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		marginVertical: 8,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	image: {
		width: 60,
		height: 60,
	},
	content: {
		flex: 1,
		marginLeft: 16,
	},
	chevron: {
		marginLeft: 16,
	},
});
