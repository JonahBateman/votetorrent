import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemedText } from "./ThemedText";
import { Authority } from "../models";

interface AuthorityCardProps {
	authority: Authority;
	onPress: () => void;
}

export default function AuthorityCard({
	authority,
	onPress,
}: AuthorityCardProps) {
	const { colors } = useTheme();
	const iconType = authority.isPinned ? "chevron-right" : "thumb-tack";

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
			<Image source={authority.image} style={styles.image} />
			<View style={styles.content}>
				<ThemedText type="subtitle">{authority.title}</ThemedText>
				<ThemedText>{authority.subtitle}</ThemedText>
			</View>
			<FontAwesome
				name={iconType}
				size={16}
				color={colors.text}
				style={styles.chevron}
			/>
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
