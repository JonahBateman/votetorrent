import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

export default function Elections() {
	const { t } = useTranslation();
	const { colors } = useTheme();

	return (
		<View style={{ backgroundColor: colors.background }}>
			<Text style={{ color: colors.text }}>{t("elections")}</Text>
		</View>
	);
}
