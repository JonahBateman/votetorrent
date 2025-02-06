import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function Authorities() {
	const { t } = useTranslation();

	return (
		<View>
			<Text>{t("authorities")}</Text>
		</View>
	);
}
