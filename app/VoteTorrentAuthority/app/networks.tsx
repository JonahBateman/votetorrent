import { FontAwesome6 } from "@expo/vector-icons";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { InfoCard } from "../components/InfoCard";
import { ThemedText } from "../components/ThemedText";
import { Network } from "../models";

export default function Networks() {
	const { colors } = useTheme() as ExtendedTheme;
	const router = useRouter();
	const { t } = useTranslation();
	const { recentNetworks } = useLocalSearchParams<{
		recentNetworks: string;
	}>();

	const handleScanPress = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		if (status === "granted") {
			router.push("/camera");
		} else {
			console.log("Camera permission denied");
		}
	};

	return (
		<>
			<Stack.Screen
				options={{
					headerLeft: () => (
						<FontAwesome6
							name="xmark"
							size={24}
							color={colors.text}
							onPress={() => router.back()}
						/>
					),
					title: "",
					headerShadowVisible: false,
				}}
			/>
			<ScrollView style={styles.container}>
				<View style={styles.section}>
					<ThemedText type="title">{t("recentNetworks")}</ThemedText>
					{JSON.parse(recentNetworks as string).map((network: Network) => (
						<InfoCard
							key={network.id}
							image={require("../assets/images/utah-flag.png")}
							title={network.name}
							additionalInfo={[{ label: t("address"), value: network.address }]}
							onPress={() => console.log(network)}
						/>
					))}
				</View>

				<View style={styles.section}>
					<ThemedText type="title">{t("find")}</ThemedText>
					<TextInput
						style={[
							styles.input,
							{ backgroundColor: colors.card, color: colors.text },
							{ borderColor: colors.border },
						]}
						placeholder={t("enterAddressOrLocation")}
						placeholderTextColor={colors.text}
					/>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: colors.accent }]}
						onPress={() => console.log("Use location")}
					>
						<ThemedText>{t("useLocation")}</ThemedText>
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<ThemedText type="title">{t("scanQrCode")}</ThemedText>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: colors.accent }]}
						onPress={handleScanPress}
					>
						<ThemedText>{t("scan")}</ThemedText>
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<ThemedText type="title">{t("enterBootstrap")}</ThemedText>
					<TextInput
						style={[
							styles.input,
							{ backgroundColor: colors.card, color: colors.text },
							{ borderColor: colors.border },
						]}
						placeholder={t("enterBootstrapPlaceholder")}
						placeholderTextColor={colors.text}
					/>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: colors.accent }]}
						onPress={() => console.log("Use bootstrap")}
					>
						<ThemedText>{t("useBootstrap")}</ThemedText>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	section: {
		marginBottom: 24,
	},
	input: {
		marginTop: 8,
		padding: 16,
		borderRadius: 32,
		fontSize: 16,
		borderWidth: 1,
	},
	button: {
		marginTop: 8,
		padding: 12,
		borderRadius: 32,
		alignItems: "center",
	},
});
