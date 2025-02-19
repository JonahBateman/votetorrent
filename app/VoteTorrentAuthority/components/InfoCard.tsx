import { useTheme } from "@react-navigation/native";
import React from "react";
import {
	Image,
	ImageSourcePropType,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome";

import { ThemedText } from "./ThemedText";

interface InfoCardProps {
	image: ImageSourcePropType;
	title: string;
	additionalInfo?: { label: string; value: string }[];
	icon?: keyof typeof FontAwesome6.glyphMap;
	onPress: () => void;
}

export function InfoCard({
	image,
	title,
	additionalInfo,
	icon,
	onPress,
}: InfoCardProps) {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.card, { backgroundColor: colors.card }]}
		>
			<Image source={image} style={styles.image} />
			<View style={styles.content}>
				<ThemedText type="subtitle" numberOfLines={1}>
					{title}
				</ThemedText>
				{additionalInfo &&
					additionalInfo.map((info) => (
						<View key={info.label} style={styles.infoText}>
							<ThemedText type="smallBold" numberOfLines={1}>
								{info.label}:{" "}
							</ThemedText>
							<ThemedText type="small" numberOfLines={1}>
								{info.value}
							</ThemedText>
						</View>
					))}
			</View>
			{icon && (
				<FontAwesome6
					name={icon}
					size={16}
					color={colors.text}
					style={styles.icon}
					iconStyle="regular"
				/>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		marginVertical: 8,
		marginHorizontal: 4,
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
		width: 50,
		height: 50,
	},
	content: {
		flex: 1,
		marginLeft: 16,
		marginRight: 8,
		paddingRight: 16,
	},
	infoText: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginLeft: 16,
	},
});
