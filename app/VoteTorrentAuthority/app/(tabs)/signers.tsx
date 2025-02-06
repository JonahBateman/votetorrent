import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function Signers() {
	const { t } = useTranslation();

	return (
		<View>
			<Text>{t("signers")}</Text>
		</View>
	);
}
