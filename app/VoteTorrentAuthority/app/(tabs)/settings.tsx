import React from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { ThemedText } from "../../components/ThemedText";

interface SettingItemProps {
	icon: string;
	label: string;
	value?: string;
	onPress?: () => void;
}

function SettingItem({ icon, label, value, onPress }: SettingItemProps) {
	const { colors } = useTheme();
	return (
		<View
			style={[
				styles.settingItem,
				{
					backgroundColor: colors.card,
				},
			]}
		>
			<FontAwesome name={icon as any} size={20} color={colors.text} />
			<View style={styles.settingContent}>
				<ThemedText>{label}</ThemedText>
				{value && <ThemedText style={{ opacity: 0.7 }}>{value}</ThemedText>}
			</View>
			<FontAwesome name="chevron-right" size={16} color={colors.text} />
		</View>
	);
}

export default function Settings() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();

	return (
		<View style={styles.container}>
			<SettingItem
				icon="user"
				label={t("account")}
				value="username@authority"
			/>
			<SettingItem
				icon="moon-o"
				label={t("appearance")}
				value={colorScheme === "dark" ? t("dark") : t("light")}
			/>
			<SettingItem icon="globe" label={t("language")} value={t("english")} />
			<SettingItem icon="info-circle" label={t("about")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		gap: 8,
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderRadius: 12,
		gap: 16,
	},
	settingContent: {
		flex: 1,
	},
});
