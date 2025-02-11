import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
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

import { NetworkCard } from "../components/NetworkCard";
import { ThemedText } from "../components/ThemedText";
import { Network } from "../models";

export default function Networks() {
	const { colors } = useTheme();
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
						<FontAwesome
							name="close"
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
					<ThemedText type="subtitle">{t("recentNetworks")}</ThemedText>
					{JSON.parse(recentNetworks as string).map((network: Network) => (
						<NetworkCard
							key={network.id}
							name={network.name}
							url={network.url}
							onPress={() => console.log(network)}
						/>
					))}
				</View>

				<View style={styles.section}>
					<ThemedText type="subtitle">{t("find")}</ThemedText>
					<TextInput
						style={[
							styles.input,
							{ backgroundColor: colors.card, color: colors.text },
						]}
						placeholder={t("enterLocationOrAddress")}
						placeholderTextColor={colors.text}
					/>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: colors.card }]}
						onPress={() => console.log("Use location")}
					>
						<ThemedText>{t("useLocation")}</ThemedText>
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<ThemedText type="subtitle">{t("scanQrCode")}</ThemedText>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: colors.card }]}
						onPress={handleScanPress}
					>
						<ThemedText>{t("scan")}</ThemedText>
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<ThemedText type="subtitle">{t("enterBootstrap")}</ThemedText>
					<TextInput
						style={[
							styles.input,
							{ backgroundColor: colors.card, color: colors.text },
						]}
						placeholder={t("enterBootstrapPlaceholder")}
						placeholderTextColor={colors.text}
					/>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: colors.card }]}
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
	},
	button: {
		marginTop: 8,
		padding: 12,
		borderRadius: 32,
		alignItems: "center",
	},
});
